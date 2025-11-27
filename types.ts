import React from 'react';

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  isProtected?: boolean;
}

export interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  price?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Testimonial {
  name: string;
  company: string;
  quote: string;
  avatarUrl: string;
}

export interface Article {
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
}

export interface GostDocument {
  id: string;
  gostNumber: string;
  title: string;
  fileType: 'pdf' | 'rtf';
  fileName: string;
}

export type OrderStatus = 'В работе' | 'Ожидает оплаты' | 'Завершен' | 'Отменен';

export interface Order {
  id: string;
  date: string;
  description: string;
  status: OrderStatus;
  reportUrl?: string;
}

export interface SavedService {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface UserDocument {
    id: string;
    date: string;
    type: 'Расчет' | 'Договор' | 'Протокол' | 'Отчет';
    totalCost?: number;
    services?: SavedService[];
    fileName?: string;
    fileUrl?: string;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    phone: string;
    company: string;
    position: string;
}