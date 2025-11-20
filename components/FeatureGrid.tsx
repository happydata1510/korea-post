import React from 'react';
import { FEATURES } from '../constants';

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-crimson tracking-wide uppercase">Our Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            더 스마트한 학교 생활의 시작
          </p>
          <p className="mt-4 text-xl text-gray-500">
            KU Connect는 단순한 게시판을 넘어, 여러분의 캠퍼스 라이프를 업그레이드할 다양한 도구를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
            >
              <div className="p-3 bg-crimson/5 rounded-lg mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};