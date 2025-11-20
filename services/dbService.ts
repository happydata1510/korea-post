import { Inquiry } from '../types';

declare global {
  interface Window {
    initSqlJs: (config?: any) => Promise<any>;
  }
}

let db: any = null;
const DB_KEY = 'ku_connect_sqlite_db';

export const initDB = async () => {
  if (db) return db;

  if (typeof window.initSqlJs !== 'function') {
    console.error("SQL.js not loaded");
    // Return a dummy object or throw to prevent immediate crash, 
    // though functional usage will fail.
    throw new Error("SQL.js is not loaded. Please reload the page.");
  }

  try {
    const SQL = await window.initSqlJs({
      locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    // Load existing DB from localStorage if available to simulate persistence
    const savedDb = localStorage.getItem(DB_KEY);
    if (savedDb) {
      try {
        const uInt8Array = new Uint8Array(JSON.parse(savedDb));
        db = new SQL.Database(uInt8Array);
      } catch (e) {
        console.error("Failed to load saved DB", e);
        db = new SQL.Database();
      }
    } else {
      db = new SQL.Database();
    }

    // Initialize Tables
    const initQuery = `
      CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        category TEXT,
        message TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `;
    db.run(initQuery);
    
    saveDB(); // Initial save
    return db;
  } catch (e) {
    console.error("Database initialization failed:", e);
    throw e;
  }
};

const saveDB = () => {
  if (!db) return;
  try {
    const data = db.export();
    // Convert Uint8Array to regular array for JSON serialization
    const arr = Array.from(data); 
    localStorage.setItem(DB_KEY, JSON.stringify(arr));
  } catch (e) {
    console.error("Failed to save DB to localStorage:", e);
  }
};

export const addInquiry = async (name: string, email: string, category: string, message: string): Promise<boolean> => {
  try {
    if (!db) await initDB();
    
    // Use db.run for simplified execution and automatic statement cleanup
    db.run(
      "INSERT INTO inquiries (name, email, category, message, created_at) VALUES (?, ?, ?, ?, datetime('now', 'localtime'))", 
      [name, email, category, message]
    );
    
    saveDB();
    return true;
  } catch (error) {
    console.error("DB Insert Error:", error);
    return false;
  }
};

export const getInquiries = async (): Promise<Inquiry[]> => {
  try {
    if (!db) await initDB();
    
    // exec returns an array of result objects: [{columns: [], values: []}]
    const result = db.exec("SELECT * FROM inquiries ORDER BY id DESC");
    
    if (!result || result.length === 0) return [];
    
    const columns = result[0].columns;
    const values = result[0].values;
    
    return values.map((row: any[]) => {
      const item: any = {};
      columns.forEach((col: string, index: number) => {
        item[col] = row[index];
      });
      return item as Inquiry;
    });
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return [];
  }
};