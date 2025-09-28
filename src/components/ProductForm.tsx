import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { FormData } from '../App';

interface ProductFormProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function ProductForm({ formData, updateFormData }: ProductFormProps) {
  const highlightOptions = [
    { id: 'practicality', label: 'Praticité' },
    { id: 'aesthetic', label: 'Esthétique / beauté' },
    { id: 'luxury', label: 'Aspect luxe / premium' },
  ];

  const presentationOptions = [
    { id: 'neutral', label: 'Sur fond neutre (studio)' },
    { id: 'real', label: 'Dans un contexte réel (utilisation, lifestyle)' },
    { id: 'both', label: 'Les deux' },
  ];

  const handleHighlightChange = (aspectId: string, checked: boolean) => {
    const currentAspects = formData.highlightAspects || [];
    if (checked) {
      updateFormData({ highlightAspects: [...currentAspects, aspectId] });
    } else {
      updateFormData({ highlightAspects: currentAspects.filter(id => id !== aspectId) });
    }
  };

  const handlePresentationChange = (styleId: string, checked: boolean) => {
    const currentStyles = formData.presentationStyle || [];
    if (checked) {
      updateFormData({ presentationStyle: [...currentStyles, styleId] });
    } else {
      updateFormData({ presentationStyle: currentStyles.filter(id => id !== styleId) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Question 1 */}
      <div>
        <Label htmlFor="mainProduct">
          1. Quel est le produit principal que vous souhaitez mettre en avant ?
        </Label>
        <Input
          id="mainProduct"
          value={formData.mainProduct}
          onChange={(e) => updateFormData({ mainProduct: e.target.value })}
          placeholder="Décrivez votre produit principal..."
          className="mt-2"
        />
      </div>

      {/* Question 2 */}
      <div>
        <Label htmlFor="characteristics">
          2. Quelles sont les caractéristiques clés de ce produit (matière, couleur, taille, utilisation) ?
        </Label>
        <Textarea
          id="characteristics"
          value={formData.productCharacteristics}
          onChange={(e) => updateFormData({ productCharacteristics: e.target.value })}
          placeholder="Décrivez les caractéristiques principales..."
          className="mt-2"
          rows={3}
        />
      </div>

      {/* Question 3 */}
      <div>
        <Label>3. Y a-t-il un ou plusieurs articles phares à valoriser en priorité ?</Label>
        <RadioGroup
          value={formData.hasFlagshipItems ? 'yes' : 'no'}
          onValueChange={(value) => updateFormData({ hasFlagshipItems: value === 'yes' })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="flagship-yes" />
            <Label htmlFor="flagship-yes">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="flagship-no" />
            <Label htmlFor="flagship-no">Non</Label>
          </div>
        </RadioGroup>
        
        {formData.hasFlagshipItems && (
          <div className="mt-4">
            <Label htmlFor="flagshipItems">Si oui, lesquels ?</Label>
            <Input
              id="flagshipItems"
              value={formData.flagshipItems}
              onChange={(e) => updateFormData({ flagshipItems: e.target.value })}
              placeholder="Listez vos articles phares..."
              className="mt-2"
            />
          </div>
        )}
      </div>

      {/* Question 4 */}
      <div>
        <Label>4. Que voulez-vous mettre en avant dans les images ?</Label>
        <div className="mt-2 space-y-3">
          {highlightOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.highlightAspects?.includes(option.id) || false}
                onCheckedChange={(checked) => handleHighlightChange(option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other-highlight"
              checked={formData.highlightAspects?.includes('other') || false}
              onCheckedChange={(checked) => handleHighlightChange('other', checked as boolean)}
            />
            <Label htmlFor="other-highlight">Autre :</Label>
            <Input
              placeholder="Précisez..."
              className="ml-2 flex-1"
              disabled={!formData.highlightAspects?.includes('other')}
            />
          </div>
        </div>
      </div>

      {/* Question 5 */}
      <div>
        <Label>5. Préférez-vous que vos produits soient présentés :</Label>
        <div className="mt-2 space-y-3">
          {presentationOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.presentationStyle?.includes(option.id) || false}
                onCheckedChange={(checked) => handlePresentationChange(option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}