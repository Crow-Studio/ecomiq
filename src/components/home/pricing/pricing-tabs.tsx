import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import AnnualPlan from "./annual-plan";
import MonthlyPlan from "./monthly-plan";

export default function PricingTabs() {
  return (
    <Tabs defaultValue="monthly" className="w-full">
      <div className="mb-8 flex justify-center">
        <TabsList className="rounded-full p-1">
          <TabsTrigger value="monthly" className="cursor-pointer rounded-full px-6">
            Monthly
          </TabsTrigger>
          <TabsTrigger value="annually" className="cursor-pointer rounded-full px-6">
            Annually (Save 20%)
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Monthly Plans */}
      <TabsContent value="monthly">
        <MonthlyPlan />
      </TabsContent>

      {/* Annual Plans */}
      <TabsContent value="annually">
        <AnnualPlan />
      </TabsContent>
    </Tabs>
  );
}
