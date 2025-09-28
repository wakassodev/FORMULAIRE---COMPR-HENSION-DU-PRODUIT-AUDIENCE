import { useState } from 'react';
import { ProductForm } from './components/ProductForm';
import { AudienceForm } from './components/AudienceForm';
import { StyleForm } from './components/StyleForm';
import { FormSummary } from './components/FormSummary';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { CheckCircle } from 'lucide-react';

export interface FormData {
  // Section 1: Produit
  mainProduct: string;
  productCharacteristics: string;
  hasFlagshipItems: boolean;
  flagshipItems: string;
  highlightAspects: string[];
  presentationStyle: string[];
  
  // Section 2: Audience
  targetAudience: string[];
  socialNetworks: string[];
  countries: string[];
  hasVisualIdentity: boolean;
  
  // Section 3: Style
  visualStyle: string[];
  adaptedFor: string[];
  inspirations: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    mainProduct: '',
    productCharacteristics: '',
    hasFlagshipItems: false,
    flagshipItems: '',
    highlightAspects: [],
    presentationStyle: [],
    targetAudience: [],
    socialNetworks: [],
    countries: [],
    hasVisualIdentity: false,
    visualStyle: [],
    adaptedFor: [],
    inspirations: '',
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const steps = [
    { number: 1, title: 'À propos du produit', component: ProductForm },
    { number: 2, title: 'À propos de votre audience', component: AudienceForm },
    { number: 3, title: 'Style d\'images souhaité', component: StyleForm },
    { number: 4, title: 'Résumé', component: FormSummary },
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.mainProduct.trim() !== '';
      case 2:
        return formData.targetAudience.length > 0;
      case 3:
        return formData.visualStyle.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-4">📝 Formulaire – Compréhension du Produit & Audience</h1>
          <p className="text-muted-foreground body-medium">
            À remplir par le client pour personnaliser vos visuels IA
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-colors
                    ${currentStep === step.number 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStep > step.number 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <div className="ml-2">
                    <div className="caption text-muted-foreground">
                      Étape {step.number}
                    </div>
                    <div className="text-sm font-medium">
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 h-0.5 mx-4 transition-colors
                    ${currentStep > step.number ? 'bg-accent' : 'bg-border'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Badge variant="outline">
              {currentStep}️⃣
            </Badge>
            <h2>{steps[currentStep - 1]?.title}</h2>
          </div>

          {CurrentStepComponent && (
            <CurrentStepComponent 
              formData={formData} 
              updateFormData={updateFormData} 
            />
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={isFirstStep}
          >
            Précédent
          </Button>
          
          <Button 
            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
            disabled={!canProceed() || isLastStep}
          >
            {isLastStep ? 'Terminé' : 'Suivant'}
          </Button>
        </div>
      </div>
    </div>
  );
}