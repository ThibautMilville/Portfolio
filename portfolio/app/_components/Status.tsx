import { Card } from "@/components/ui/card";
import { Section } from "./Section";

export const Status = () => {
  return (
    <Section className="flex max-md:flex-col items-start gap-4">
      <div className="flex-[3]">
        <Card className="w-full p-4 flex flex-col gap-2">Side projects</Card>
      </div>
      <div className="flex-[2] flex flex-col gap-4">
        <Card className="flex-1 p-4">Work</Card>
        <Card className="flex-1 p-4">Contact me</Card>
      </div>
    </Section>
  );
};
