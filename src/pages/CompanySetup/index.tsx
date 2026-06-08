import { useEffect, useState } from "react";
import styles from "./CompanySetup.module.css";

import { StepOne, StepTwo, StepThree, SidebarStepper } from "./components";
import { useCompanyForm } from "./hooks/useCompanyForm";

const CompanySetup = () => {
  const { currentStep, formData, errors, updateForm, nextStep, previousStep } =
    useCompanyForm();

  const [animationClass, setAnimationClass] = useState("");

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
            formData={formData}
            errors={errors}
            updateForm={updateForm}
            nextStep={nextStep}
          />
        );

      case 2:
        return (
          <StepTwo
            formData={formData}
            errors={errors}
            updateForm={updateForm}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );

      case 3:
        return (
          <StepThree
            formData={formData}
            errors={errors}
            updateForm={updateForm}
            onPrevious={previousStep}
            onSubmit={nextStep}
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
            key={currentStep}
            className={`${styles.stepContent} ${styles[animationClass]}`}
          >
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySetup;
