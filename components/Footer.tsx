import React from 'react';
import { APP_NAME } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-crimson rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm">
              고려대학교 학생들을 위한<br/>
              Next Gen 커뮤니티 플랫폼
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">서비스</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">자유게시판</a></li>
              <li><a href="#" className="hover:text-white transition-colors">중고장터</a></li>
              <li><a href="#" className="hover:text-white transition-colors">강의평가</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI 비서</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">소개</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">운영진 소개</a></li>
              <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-white transition-colors">제휴 문의</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">연락처</h4>
            <p className="text-gray-400 text-sm mb-2">support@kuconnect.com</p>
            <p className="text-gray-400 text-sm">서울시 성북구 안암로 145</p>
            <div className="flex gap-4 mt-4">
               {/* Social Icons placeholders */}
               <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">F</div>
               <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">I</div>
               <div className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">T</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p className="mt-2 text-xs">KU Connect is a student-led initiative and is not officially affiliated with Korea University administration.</p>
        </div>
      </div>
    </footer>
  );
};