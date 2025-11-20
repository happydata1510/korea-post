import React from 'react';
import { MOCK_STATS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
         <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[80%] rounded-full bg-crimson blur-3xl transform rotate-12"></div>
         <div className="absolute top-[40%] -left-[10%] w-[40%] h-[60%] rounded-full bg-gray-300 blur-3xl transform -rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            민족의 아리아, <br/>
            <span className="text-crimson">하나되는 고대</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            고려대학교 학생들을 위한 프리미엄 커뮤니티 <strong>KU Connect</strong>에 오신 것을 환영합니다. 
            학업 정보 공유부터 끈끈한 선후배 네트워크까지, 호랑이들의 광장이 열립니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-crimson hover:bg-crimson-dark shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              지금 시작하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all">
              둘러보기
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
            {MOCK_STATS.map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-bold text-crimson">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white bg-white">
                 {/* Placeholder for a UI Mockup Image - using a styled div instead of external image to ensure reliability */}
                 <div className="aspect-[4/3] bg-gray-100 flex flex-col">
                    <div className="h-8 bg-gray-200 border-b border-gray-300 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 p-6 bg-gray-50">
                        <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                             <div className="h-8 w-1/3 bg-gray-100 rounded mb-6"></div>
                             <div className="space-y-3">
                                 <div className="h-20 w-full bg-red-50 rounded-lg border-l-4 border-crimson p-4">
                                     <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                                     <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                                 </div>
                                 <div className="h-20 w-full bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                     <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                                     <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
                                 </div>
                                 <div className="h-20 w-full bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                                     <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
                                     <div className="h-3 w-1/3 bg-gray-100 rounded"></div>
                                 </div>
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
                 <div className="w-12 h-12 bg-crimson/10 rounded-full flex items-center justify-center text-2xl">🐯</div>
                 <div>
                     <p className="font-bold text-gray-900">오늘의 학식</p>
                     <p className="text-xs text-gray-500">AI가 추천해드려요!</p>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};