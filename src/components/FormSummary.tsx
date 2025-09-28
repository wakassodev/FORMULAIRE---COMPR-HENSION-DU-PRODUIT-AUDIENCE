import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Download, Mail, Copy } from 'lucide-react';
import { FormData } from '../App';
import jsPDF from 'jspdf';

interface FormSummaryProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export function FormSummary({ formData, updateFormData }: FormSummaryProps) {
  const getLabels = (field: string[], mapping: Record<string, string>) => {
    return field?.map(id => mapping[id] || id).filter(Boolean) || [];
  };

  const audienceMapping = {
    'men': 'Hommes',
    'women': 'Femmes',
    'young': 'Jeunes (18–25 ans)',
    'adults': 'Adultes (25–40 ans)',
    'seniors': '+40 ans',
    'families': 'Familles',
    'businesses': 'Entreprises',
  };

  const socialMapping = {
    'facebook': 'Facebook',
    'instagram': 'Instagram',
    'whatsapp': 'WhatsApp',
    'tiktok': 'TikTok',
  };

  const countryMapping = {
    'niger': 'Niger',
    'senegal': 'Sénégal',
    'cote-ivoire': 'Côte d\'Ivoire',
    'cameroon': 'Cameroun',
  };

  const styleMapping = {
    'modern-minimal': 'Moderne et minimaliste',
    'warm-colorful': 'Chaleureux et coloré',
    'premium-luxury': 'Premium / luxueux',
    'african-local': 'Inspiré des tendances africaines locales',
    'international': 'International / universel',
  };

  const highlightMapping = {
    'practicality': 'Praticité',
    'aesthetic': 'Esthétique / beauté',
    'luxury': 'Aspect luxe / premium',
  };

  const presentationMapping = {
    'neutral': 'Sur fond neutre (studio)',
    'real': 'Dans un contexte réel (utilisation, lifestyle)',
    'both': 'Les deux',
  };

  const adaptedMapping = {
    'regular-posts': 'Publications régulières (feed)',
    'stories': 'Stories / posts rapides',
    'catalogs': 'Catalogues / affiches professionnelles',
    'ads': 'Publicités sponsorisées',
  };

  // const exportData = () => {
    const summary = `
FORMULAIRE - COMPRÉHENSION DU PRODUIT & AUDIENCE
================================================

🎯 À PROPOS DU PRODUIT
----------------------
Produit principal: ${formData.mainProduct}
Caractéristiques: ${formData.productCharacteristics}
Articles phares: ${formData.hasFlagshipItems ? 'Oui - ' + formData.flagshipItems : 'Non'}
Mise en avant: ${getLabels(formData.highlightAspects, highlightMapping).join(', ')}
Présentation: ${getLabels(formData.presentationStyle, presentationMapping).join(', ')}

👥 À PROPOS DE L'AUDIENCE
-------------------------
Clientèle cible: ${getLabels(formData.targetAudience, audienceMapping).join(', ')}
Réseaux sociaux: ${getLabels(formData.socialNetworks, socialMapping).join(', ')}
Pays/Régions: ${getLabels(formData.countries, countryMapping).join(', ')}
Identité visuelle: ${formData.hasVisualIdentity ? 'Oui' : 'Non'}

🎨 STYLE D'IMAGES
-----------------
Style visuel: ${getLabels(formData.visualStyle, styleMapping).join(', ')}
Adapté pour: ${getLabels(formData.adaptedFor, adaptedMapping).join(', ')}
Inspirations: ${formData.inspirations || 'Aucune'}

Date: ${new Date().toLocaleDateString('fr-FR')}
  `.trim();

  const exportData = () => {
    navigator.clipboard.writeText(summary);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(summary, 10, 10);
    doc.save('formulaire_resume.pdf');
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Résumé du formulaire – Compréhension du Produit & Audience");
    const body = encodeURIComponent(summary);
    window.open(`mailto:wakasso.me@gmail.com?subject=${subject}&body=${body}`);
  };

  const sendWhatsApp = () => {
    const phone = '971555514820';
    const text = encodeURIComponent(summary);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };


  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="mb-2">Récapitulatif de vos réponses</h3>
        <p className="text-muted-foreground">
          Voici un résumé de toutes les informations collectées pour personnaliser vos visuels IA.
        </p>
      </div>

      {/* Section 1: Produit */}
      <Card className="p-4">
        <h4 className="flex items-center gap-2 mb-4">
          🎯 À propos du produit
        </h4>
        <div className="space-y-3">
          <div>
            <span className="text-muted-foreground caption">Produit principal:</span>
            <p className="mt-1">{formData.mainProduct || 'Non renseigné'}</p>
          </div>
          
          {formData.productCharacteristics && (
            <div>
              <span className="text-muted-foreground caption">Caractéristiques:</span>
              <p className="mt-1">{formData.productCharacteristics}</p>
            </div>
          )}
          
          <div>
            <span className="text-muted-foreground caption">Articles phares:</span>
            <p className="mt-1">
              {formData.hasFlagshipItems ? `Oui - ${formData.flagshipItems}` : 'Non'}
            </p>
          </div>
          
          {formData.highlightAspects?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Mise en avant:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.highlightAspects, highlightMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {formData.presentationStyle?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Présentation:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.presentationStyle, presentationMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Section 2: Audience */}
      <Card className="p-4">
        <h4 className="flex items-center gap-2 mb-4">
          👥 À propos de votre audience
        </h4>
        <div className="space-y-3">
          {formData.targetAudience?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Clientèle cible:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.targetAudience, audienceMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {formData.socialNetworks?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Réseaux sociaux:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.socialNetworks, socialMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {formData.countries?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Pays/Régions:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.countries, countryMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <span className="text-muted-foreground caption">Identité visuelle:</span>
            <p className="mt-1">{formData.hasVisualIdentity ? 'Oui' : 'Non'}</p>
          </div>
        </div>
      </Card>

      {/* Section 3: Style */}
      <Card className="p-4">
        <h4 className="flex items-center gap-2 mb-4">
          🎨 Style d'images souhaité
        </h4>
        <div className="space-y-3">
          {formData.visualStyle?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Style visuel:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.visualStyle, styleMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {formData.adaptedFor?.length > 0 && (
            <div>
              <span className="text-muted-foreground caption">Adapté pour:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {getLabels(formData.adaptedFor, adaptedMapping).map((label, index) => (
                  <Badge key={index} variant="secondary">{label}</Badge>
                ))}
              </div>
            </div>
          )}
          
          {formData.inspirations && (
            <div>
              <span className="text-muted-foreground caption">Inspirations:</span>
              <p className="mt-1">{formData.inspirations}</p>
            </div>
          )}
        </div>
      </Card>

      <Separator />

      {/* Actions */}
      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copier le résumé
        </Button>
        <Button onClick={downloadPDF} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Télécharger PDF
        </Button>
        <Button onClick={sendEmail} variant="outline" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Envoyer par email
        </Button>
        <Button onClick={sendWhatsApp} variant="outline" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.364L4 29l7.636-2.236A11.96 11.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.797 0-3.504-.527-4.96-1.516l-.353-.236-4.537 1.33 1.33-4.537-.236-.353A8.963 8.963 0 017 15c0-4.963 4.037-9 9-9s9 4.037 9 9-4.037 9-9 9zm4.406-6.094c-.242-.121-1.434-.707-1.655-.788-.221-.081-.382-.121-.543.121-.161.242-.621.788-.761.95-.141.161-.281.182-.523.061-.242-.121-1.022-.377-1.947-1.201-.72-.642-1.207-1.435-1.35-1.677-.141-.242-.015-.373.106-.494.109-.109.242-.282.363-.423.121-.141.161-.242.242-.403.081-.161.04-.303-.02-.424-.061-.121-.543-1.312-.744-1.797-.196-.471-.396-.406-.543-.414l-.462-.008c-.161 0-.424.06-.646.303-.221.242-.848.828-.848 2.018s.868 2.342.989 2.505c.121.161 1.708 2.613 4.145 3.557.58.199 1.031.318 1.383.406.581.139 1.111.119 1.529.072.466-.055 1.434-.586 1.638-1.152.202-.566.202-1.051.142-1.152-.06-.101-.22-.161-.462-.282z" fill="#25D366"/></svg>
          Envoyer sur WhatsApp
        </Button>
      </div>
    </div>
  );
}