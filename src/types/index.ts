export type FrameShape = 'Redondo' | 'Gatinho' | 'Aviador' | 'Retangular' | 'Oval' | 'Quadrado';
export type ProductCategory = 'Grau' | 'Sol' | 'Multifocal';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: ProductCategory;
  frameShape: FrameShape;
  tags: string[];
  color: string;
}

export interface FaceAnalysisResult {
  source: 'gemini' | 'huggingface' | 'nvidia' | 'local';
  faceShape: string;
  description: string;
  recommendedFrameShapes: FrameShape[];
  styleAdvice: string;
  recommendedProducts: Array<{ productId: string; reason: string }>;
}

export interface ContactLead {
  name: string;
  email: string;
  phone: string;
  message: string;
}
