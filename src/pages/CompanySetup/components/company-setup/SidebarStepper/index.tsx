import logo from "../../../../../assets/images/Logo.png";
import styles from "./SidebarStepper.module.css";

type Props = {
  currentStep: number;
};

const SidebarStepper = ({ currentStep }: Props) => {
  const steps = [
    {
      desc: "Basic information about your company",
      number: "1",
      title: "Company Details",
    },
    {
      desc: "Tell us more about your company",
      number: "2",
      title: "Company Profile",
    },
    {
      desc: "Add admin user details for this account",
      number: "3",
      title: "User Details",
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img alt="Logo" src={logo} />
        </div>

        <h2>GROWFUSION</h2>
      </div>

      {/* Steps */}
      <div>
        {steps.map((step, index) => {
          const isActive = currentStep === index + 1;

          const isCompleted = currentStep > index + 1;

          return (
            <div className={styles.step} key={index}>
              <div className={styles.left}>
                <div
                  className={`${styles.circle} ${
                    isActive ? styles.active : ""
                  } ${isCompleted ? styles.completed : ""}`}
                >
                  {step.number}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`${styles.line} ${
                      currentStep > index + 1 ? styles.lineActive : ""
                    }`}
                  />
                )}
              </div>

              <div className={styles.right}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className={styles.progressCard}>
        <span>STEP {currentStep} OF 3</span>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(currentStep / 3) * 100}%`,
            }}
          />
        </div>

        <p>{Math.round((currentStep / 3) * 100)}%</p>
      </div>

      {/* Security */}
      <div className={styles.security}>
        <span>🔒</span>

        <p>Your information is safe and secure with us.</p>
      </div>
    </aside>
  );
};

export default SidebarStepper;
