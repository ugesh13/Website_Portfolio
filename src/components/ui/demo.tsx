import { CertificateAccordion, type Certificate } from "./interactive-image-accordion";

const SAMPLE_CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    imageUrl: "/certificates/linkedin-learning-generative-ai.jpeg",
  },
  {
    id: 2,
    title: "Coding Foundations",
    issuer: "SoloLearn",
    imageUrl: "/certificates/sololearn-coding-foundations.jpeg",
  },
  {
    id: 3,
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    imageUrl: "/certificates/anthropic-ai-fluency.jpeg",
  },
  {
    id: 4,
    title: "Smart India Hackathon 2026",
    issuer: "MoE Innovation Cell / AICTE / JAIN University",
    imageUrl: "/certificates/smart-india-hackathon-2026.jpeg",
  },
  {
    id: 5,
    title: "AVISHKAR 2026 Hackathon",
    issuer: "JAIN Faculty of Engineering & Technology",
    imageUrl: "/certificates/avishkar-hackathon-2026.jpeg",
  },
];

export function CertificateAccordionDemo() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-[#050505]">
      <CertificateAccordion
        items={SAMPLE_CERTIFICATES}
        onCertificateClick={(cert) => {
          console.log("Selected certificate:", cert);
        }}
      />
    </div>
  );
}

export default CertificateAccordionDemo;

