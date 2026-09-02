import CRMHero from "../components/crm/CRMHero";
import CRMFeatures from "../components/crm/CRMFeatures";
import CRMWorkflow from "../components/crm/CRMWorkflow";
import CRMCTA from "../components/crm/CRMCTA";

export default function CRM() {
  return (
    <div className="friday-page-gradient">
      <CRMHero />
      <CRMFeatures />
      <CRMWorkflow />
      <CRMCTA />
    </div>
  );
}