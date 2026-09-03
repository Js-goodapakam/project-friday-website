import CommunicationHero from "../components/communication/CommunicationHero";
import CommunicationFeatures from "../components/communication/CommunicationFeatures";
import CommunicationWorkflow from "../components/communication/CommunicationWorkflow";
import CommunicationCTA from "../components/communication/CommunicationCTA";

export default function Communication() {
  return (
    <div className="friday-page-gradient">
      <CommunicationHero />
      <CommunicationFeatures />
      <CommunicationWorkflow />
      <CommunicationCTA />
    </div>
  );
}
