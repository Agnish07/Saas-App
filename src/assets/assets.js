// assets.js
import logo from "./logo.svg";
import gradientbg from "./gradientbg.png";
import user_group from "./user_group.png";
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react';

export const assets = {
  logo,
  gradientbg,
  user_group,
}

export const AiToolsData = [
  {
    title: 'AI Article Writer',
    description: 'Generate high-quality, engaging articles on any topic with our AI writing technology.',
    Icon: SquarePen,
    bg: '#2A2A2A',
    path: '/ai/write-article'
  },
  {
    title: 'Blog Title Generator',
    description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
    Icon: Hash,
    bg: '#2A2A2A',
    path: '/ai/blog-titles'
  },
  {
    title: 'AI Image Generation',
    description: 'Create stunning visuals with our AI image generation tool.',
    Icon: Image,
    bg: '#2A2A2A',
    path: '/ai/generate-images'
  },
  {
    title: 'Background Removal',
    description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
    Icon: Eraser,
    bg: '#2A2A2A',
    path: '/ai/remove-background'
  },
  {
    title: 'Object Removal',
    description: 'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
    Icon: Scissors,
    bg: '#2A2A2A',
    path: '/ai/remove-object'
  },
  {
    title: 'Resume Reviewer',
    description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
    Icon: FileText,
    bg: '#2A2A2A',
    path: '/ai/review-resume'
  }
]
