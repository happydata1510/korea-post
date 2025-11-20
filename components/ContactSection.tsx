import React, { useState, useEffect } from 'react';
import { Send, Database, User, Mail, MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react';
import { addInquiry, getInquiries } from '../services/dbService';
import { Inquiry } from '../types';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('일반 문의');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // For Admin/DB Demo
  const [showAdmin, setShowAdmin] = useState(false);
  const [dbData, setDbData] = useState<Inquiry[]>([]);
  const [isLoadingDb, setIsLoadingDb] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await addInquiry(name, email, category, message);
      if (success) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setCategory('일반 문의');
        // If admin view is open, refresh data
        if (showAdmin) fetchDbData();
        
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (e) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchDbData = async () => {
    setIsLoadingDb(true);
    const data = await getInquiries();
    setDbData(data);
    setIsLoadingDb(false);
  };

  useEffect(() => {
    if (showAdmin) {
      fetchDbData();
    }
  }, [showAdmin]);

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-base font-semibold text-crimson tracking-wide uppercase">Contact Us</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            무엇이든 물어보세요
          </p>
          <p className="mt-4 text-lg text-gray-500">
            KU Connect 팀은 여러분의 소중한 의견을 기다립니다.<br/>
            작성해주신 내용은 <strong className="text-crimson">SQLite 데이터베이스</strong>에 안전하게 저장됩니다.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left: Contact Information & Decorative */}
          <div className="bg-crimson p-10 md:w-1/3 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">고객 지원</h3>
              <p className="text-crimson-light-text mb-8 opacity-90 leading-relaxed">
                서비스 이용 중 불편한 점이나 제휴 문의가 있으시다면 언제든 연락주세요.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 opacity-75" />
                  <span>support@kuconnect.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 opacity-75" />
                  <span>평균 응답시간 24시간 이내</span>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10">
               <button 
                 onClick={() => setShowAdmin(!showAdmin)}
                 className="flex items-center gap-2 text-xs bg-black/20 hover:bg-black/30 px-3 py-2 rounded transition-colors w-fit"
               >
                 <Database className="w-3 h-3" />
                 {showAdmin ? '관리자 모드 끄기' : '관리자 모드 (DB 확인)'}
               </button>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 -left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Right: Form or Admin Table */}
          <div className="p-10 md:w-2/3 bg-white min-h-[500px]">
            {showAdmin ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                     <Database className="w-5 h-5 text-crimson" />
                     SQLite 데이터베이스 현황
                   </h3>
                   <button 
                     onClick={fetchDbData} 
                     className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                     title="새로고침"
                   >
                     <RefreshCw className={`w-4 h-4 text-gray-500 ${isLoadingDb ? 'animate-spin' : ''}`} />
                   </button>
                </div>
                
                <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">분류</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메시지</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dbData.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                            데이터가 없습니다. 왼쪽 폼에서 문의를 등록해보세요.
                          </td>
                        </tr>
                      ) : (
                        dbData.map((row) => (
                          <tr key={row.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {row.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate" title={row.message}>{row.message}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">{row.created_at}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-right">* in-memory SQLite DB (localStorage persisted)</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        required
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-crimson focus:border-crimson sm:text-sm py-2 border"
                        placeholder="홍길동"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-crimson focus:border-crimson sm:text-sm py-2 border"
                        placeholder="ku@korea.ac.kr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">문의 유형</label>
                  <select
                    id="category"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-crimson focus:border-crimson sm:text-sm py-2 border px-3"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>일반 문의</option>
                    <option>시스템 오류 신고</option>
                    <option>광고 및 제휴</option>
                    <option>기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-crimson focus:border-crimson sm:text-sm py-2 border px-3"
                    placeholder="궁금하신 내용을 자세히 적어주세요."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all
                      ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-crimson hover:bg-crimson-dark'}`}
                  >
                    {isSubmitting ? '처리중...' : (
                      <>
                        문의하기
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="rounded-md bg-green-50 p-4 animate-fade-in">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">문의가 성공적으로 등록되었습니다.</p>
                      </div>
                    </div>
                  </div>
                )}
                 {submitStatus === 'error' && (
                  <div className="rounded-md bg-red-50 p-4 animate-fade-in">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">등록에 실패했습니다. 잠시 후 다시 시도해주세요.</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};