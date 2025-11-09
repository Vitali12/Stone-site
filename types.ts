
import React from 'react';

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
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
  price: string;
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
