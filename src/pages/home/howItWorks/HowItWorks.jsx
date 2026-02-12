import {
  PackageCheck,
  Scissors,
  Shirt,
  Truck,
  CheckCircle,
} from "lucide-react";
import AnimationContainer from "../../../components/shared/AnimationContainer";
import SectionTitle from "../../../components/shared/SectionTitle";


const steps = [
  {
    id: 1,
    title: "Order Placed",
    description:
      "Buyers place bulk garment orders through our secure system. Order details are instantly recorded.",
    icon: <PackageCheck size={28} />,
  },
  {
    id: 2,
    title: "Production Started",
    description:
      "Managers initiate cutting & sewing processes while tracking progress in real time.",
    icon: <Scissors size={28} />,
  },
  {
    id: 3,
    title: "Quality Check",
    description:
      "Each product undergoes strict QC inspection before approval.",
    icon: <Shirt size={28} />,
  },
  {
    id: 4,
    title: "Packed & Shipped",
    description:
      "Products are securely packed and shipping details are updated with tracking.",
    icon: <Truck size={28} />,
  },
  {
    id: 5,
    title: "Delivered",
    description:
      "Order successfully delivered. Buyer can view full tracking history anytime.",
    icon: <CheckCircle size={28} />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <AnimationContainer variant="fade-up">
          <div className="mb-16 text-center">
            <SectionTitle title="Smart Garments Production Workflow">
              How It Works
            </SectionTitle>
          </div>
        </AnimationContainer>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">

          {/* Desktop Line */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gray-200" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {steps.map((step, index) => (
              <AnimationContainer
                key={step.id}
                variant={index % 2 === 0 ? "fade-up" : "fade-down"}
                delay={index * 0.2}
              >
                <div className="relative flex flex-col items-center text-center group">

                  {/* Step Number */}
                  <span className="absolute -top-6 text-sm font-bold text-primary">
                    0{step.id}
                  </span>

                  {/* Icon Circle */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                    bg-[#d1c8c0] text-primary 
                    group-hover:bg-primary 
                    group-hover:text-white 
                    transition duration-300 shadow-md">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h4 className="mt-6 text-lg font-semibold text-gray-800">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
