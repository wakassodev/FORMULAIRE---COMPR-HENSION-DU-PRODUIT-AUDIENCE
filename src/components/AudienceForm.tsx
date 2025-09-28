import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';
import { FormData } from '../App';

interface AudienceFormProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function AudienceForm({ formData, updateFormData }: AudienceFormProps) {
  const audienceOptions = [
    { id: 'men', label: 'Hommes' },
    { id: 'women', label: 'Femmes' },
    { id: 'young', label: 'Jeunes (18–25 ans)' },
    { id: 'adults', label: 'Adultes (25–40 ans)' },
    { id: 'seniors', label: '+40 ans' },
    { id: 'families', label: 'Familles' },
    { id: 'businesses', label: 'Entreprises' },
  ];

  const socialNetworksOptions = [
    { id: 'facebook', label: 'Facebook' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'tiktok', label: 'TikTok' },
  ];

  const countriesOptions = [
    { id: 'niger', label: 'Niger' },
    { id: 'senegal', label: 'Sénégal' },
    { id: 'cote-ivoire', label: 'Côte d\'Ivoire' },
    { id: 'cameroon', label: 'Cameroun' },
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
      {/* Question 6 */}
      <div>
        <Label>6. Qui est votre clientèle cible ?</Label>
        <div className="mt-2 space-y-3">
          {audienceOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.targetAudience?.includes(option.id) || false}
                onCheckedChange={(checked) => handleArrayFieldChange('targetAudience', option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other-audience"
              checked={formData.targetAudience?.includes('other') || false}
              onCheckedChange={(checked) => handleArrayFieldChange('targetAudience', 'other', checked as boolean)}
            />
            <Label htmlFor="other-audience">Autre :</Label>
            <Input
              placeholder="Précisez..."
              className="ml-2 flex-1"
              disabled={!formData.targetAudience?.includes('other')}
            />
          </div>
        </div>
      </div>

      {/* Question 7 */}
      <div>
        <Label>7. Quels réseaux sociaux utilisent le plus vos clients ?</Label>
        <div className="mt-2 space-y-3">
          {socialNetworksOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.socialNetworks?.includes(option.id) || false}
                onCheckedChange={(checked) => handleArrayFieldChange('socialNetworks', option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other-social"
              checked={formData.socialNetworks?.includes('other') || false}
              onCheckedChange={(checked) => handleArrayFieldChange('socialNetworks', 'other', checked as boolean)}
            />
            <Label htmlFor="other-social">Autres :</Label>
            <Input
              placeholder="Précisez..."
              className="ml-2 flex-1"
              disabled={!formData.socialNetworks?.includes('other')}
            />
          </div>
        </div>
      </div>

      {/* Question 8 */}
      <div>
        <Label>8. Dans quels pays ou régions d'Afrique se trouvent vos clients principaux ?</Label>
        <div className="mt-2 space-y-3">
          {countriesOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.countries?.includes(option.id) || false}
                onCheckedChange={(checked) => handleArrayFieldChange('countries', option.id, checked as boolean)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="other-country"
              checked={formData.countries?.includes('other') || false}
              onCheckedChange={(checked) => handleArrayFieldChange('countries', 'other', checked as boolean)}
            />
            <Label htmlFor="other-country">Autre :</Label>
            <Input
              placeholder="Précisez..."
              className="ml-2 flex-1"
              disabled={!formData.countries?.includes('other')}
            />
          </div>
        </div>
      </div>

      {/* Question 9 */}
      <div>
        <Label>9. Avez-vous déjà une identité visuelle (logo, couleurs, charte graphique) ?</Label>
        <RadioGroup
          value={formData.hasVisualIdentity ? 'yes' : 'no'}
          onValueChange={(value) => updateFormData({ hasVisualIdentity: value === 'yes' })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="identity-yes" />
            <Label htmlFor="identity-yes">Oui</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="identity-no" />
            <Label htmlFor="identity-no">Non</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}