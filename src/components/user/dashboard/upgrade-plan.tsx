import { RiNotificationFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Alert, AlertIcon, AlertTitle, AlertToolbar } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";

export default function UpgradePlan() {
  const [isClose, setIsClose] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <AnimatePresence>
        {!isClose && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "backInOut" }}
            className="w-full"
          >
            <Alert close={true} onClick={() => setIsClose(true)}>
              <AlertIcon>
                <RiNotificationFill />
              </AlertIcon>
              <AlertTitle>Your trial ends on August 29</AlertTitle>
              <AlertToolbar>
                <Button
                  variant="inverse"
                  mode="link"
                  underlined="solid"
                  size="sm"
                  className="mt-0.5 flex"
                >
                  Upgrade
                </Button>
              </AlertToolbar>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
