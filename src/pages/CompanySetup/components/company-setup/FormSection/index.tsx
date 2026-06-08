import styles from "./FormSection.module.css";

type Props = {
  title: string;
  children: React.ReactNode;
};

const FormSection = ({ title, children }: Props) => {
  return (
    <section className={styles.card}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

export default FormSection;
