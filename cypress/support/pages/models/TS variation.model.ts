export interface Variation {
    status?: 'inactive' | 'active';
    variationNumber?: number;
    bcv?: number[];
    minimumBasePRTP?: number;
    maximumBasePRTP?: number;
    minimumFeaturePRTP?: number;
    maximumFeaturePRTP?: number;
    sapPRTP?: number;
    minimumTotalPRTP?: number;
    maximumTotalPRTP?: number;
  }
  
  export interface VariationFieldState {
    state?: 'enabled' | 'disabled';
    minimumRTP?: 'disabled' | 'highlight' | 'invalid' | 'masked';
    maximumRTP?: 'disabled' | 'highlight' | 'invalid' | 'masked';
    minFeaturePRTP?: 'disabled' | 'highlight' | 'invalid' | 'masked';
    maxFeaturePRTP?: 'disabled' | 'highlight' | 'invalid' | 'masked';
    sapPRTP?: 'disabled' | 'highlight' | 'invalid' | 'masked';
  }
  