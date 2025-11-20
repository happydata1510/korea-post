import React from 'react';
import { MessageSquare, Shield, BookOpen, ShoppingBag, Calendar, Trophy } from 'lucide-react';
import { FeatureItem } from './types';

export const APP_NAME = "KU Connect";

export const FEATURES: FeatureItem[] = [
  {
    title: "자유 게시판 (Free Board)",
    description: "학우들과 자유롭게 소통하세요. 익명성이 보장된 공간에서 솔직한 이야기를 나눌 수 있습니다.",
    icon: <MessageSquare className="w-6 h-6 text-crimson" />,
  },
  {
    title: "강의 평가 (Course Reviews)",
    description: "수강신청 전 필수 확인! 선배들의 생생한 강의 후기와 꿀팁을 확인해보세요.",
    icon: <BookOpen className="w-6 h-6 text-crimson" />,
  },
  {
    title: "벼룩시장 (Marketplace)",
    description: "전공 서적부터 자취 용품까지. 고대생들끼리 믿고 거래하는 중고 장터입니다.",
    icon: <ShoppingBag className="w-6 h-6 text-crimson" />,
  },
  {
    title: "동아리/학회 (Clubs)",
    description: "새로운 인연과 경험. 교내 다양한 동아리와 학회의 모집 정보를 한눈에 확인하세요.",
    icon: <Calendar className="w-6 h-6 text-crimson" />,
  },
  {
    title: "고대 AI 비서 (KU AI)",
    description: "Gemini 2.5 기반의 AI가 학교 생활 궁금증을 해결해줍니다. 학식 메뉴부터 도서관 좌석까지.",
    icon: <Trophy className="w-6 h-6 text-crimson" />,
  },
  {
    title: "철저한 인증 (Verified)",
    description: "고려대학교 이메일 인증을 통해서만 가입이 가능합니다. 클린한 커뮤니티를 약속합니다.",
    icon: <Shield className="w-6 h-6 text-crimson" />,
  },
];

export const MOCK_STATS = [
  { label: "Active Students", value: "25,000+" },
  { label: "Daily Posts", value: "3,200+" },
  { label: "Verified Alumni", value: "12,000+" },
];