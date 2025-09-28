import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { FormData } from '../App';

interface StyleFormProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function StyleForm({ formData, updateFormData }: StyleFormProps) {
  const visualStyleOptions = [
    { id: 'modern-minimal', label: 'Moderne et minimaliste' },
    { id: 'warm-colorful', label: 'Chaleureux et coloré' },
    { id: 'premium-luxury', label: 'Premium / luxueux' },
    { id: 'african-local', label: 'Inspiré des tendances africaines locales' },
    { id: 'international', label: 'International / universel' },
  ];

  const adaptedForOptions = [
    { id: 'regular-posts', label: 'Publications régulières (feed)' },
    { id: 'stories', label: 'Stories / posts rapides' },
    { id: 'catalogs', label: 'Catalogues / affiches professionnelles' },
    { id: 'ads', label: 'Publicités sponsorisées' },
  ];

  const handleArrayFieldChange = (field: keyof FormData, itemId: string, checked: boolean) => {
    const currentItems = (formData[field] as string[]) || [];
    if (checked) {
      updateFormData({ [field]: [...currentItems, itemId] });
    } else {
      updateFormData({ [field]: currentItems.filter(id => id !== itemId) });
    }
  };

  return (
    <div className="space-y-6">
      {/* Question 10 */}
      <div>
        <Label>10. Quel style préférez-vous pour vos visuels ?</Label>
        <div className="mt-2 space-y-3">
          {visualStyleOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.visualStyle?.includes(option.id) || false}
                onCheckedChange={(checked) => handleArrayFieldChange('visualStyle', option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Question 11 */}
      <div>
        <Label>11. Les visuels doivent être adaptés pour :</Label>
        <div className="mt-2 space-y-3">
          {adaptedForOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.adaptedFor?.includes(option.id) || false}
                onCheckedChange={(checked) => handleArrayFieldChange('adaptedFor', option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Question 12 */}
      <div>
        <Label htmlFor="inspirations">
          12. Y a-t-il des marques ou pages Facebook/Instagram dont le style visuel vous inspire ?
        </Label>
        <div className="mt-2 space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="has-inspirations"
              checked={formData.inspirations !== ''}
              onCheckedChange={(checked) => {
                if (!checked) {
                  updateFormData({ inspirations: '' });
                }
              }}
            />
            <Label htmlFor="has-inspirations">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="no-inspirations"
              checked={formData.inspirations === ''}
              onCheckedChange={(checked) => {
                if (checked) {
                  updateFormData({ inspirations: '' });
                }
              }}
            />
            <Label htmlFor="no-inspirations">Non</Label>
          </div>
        </div>
        
        {formData.inspirations !== '' && (
          <div className="mt-4">
            <Textarea
              id="inspirations"
              value={formData.inspirations}
              onChange={(e) => updateFormData({ inspirations: e.target.value })}
              placeholder="Mentionnez les marques ou pages qui vous inspirent..."
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}