import { useEffect, useState } from "react";

import styles from "./CompanySetup.module.css";
import { SidebarStepper, StepOne, StepThree, StepTwo } from "./components";
import { useCompanyForm } from "./hooks/useCompanyForm";

const CompanySetup = () => {
  const { currentStep, errors, formData, nextStep, previousStep, updateForm } =
    useCompanyForm();

  const [animationClass, setAnimationClass] = useState<"slideIn" | "slideOut">(
    "slideOut",
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationClass("slideIn");
    }, 10);

    return () => clearTimeout(timeout);
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            errors={errors}
            formData={formData}
            nextStep={nextStep}
            updateForm={updateForm}
          />
        );

      case 2:
        return (
          <StepTwo
            errors={errors}
            formData={formData}
            onNext={nextStep}
            onPrevious={previousStep}
            updateForm={updateForm}
          />
        );

      case 3:
        return (
          <StepThree
            errors={errors}
            formData={formData}
            onPrevious={previousStep}
            onSubmit={nextStep}
            updateForm={updateForm}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SidebarStepper currentStep={currentStep} />

        <div className={styles.content}>
          <div
            className={`${styles.stepContent} ${animationClass === "slideIn" ? styles.slideIn : ""} ${animationClass === "slideOut" ? styles.slideOut : ""}`}
            key={currentStep}
          >
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
