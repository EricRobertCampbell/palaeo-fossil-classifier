import styles from "./identify.module.css";
import { IdentifyNav } from "./components/IdentifyNav";
import {
  TeethMammalsSection,
  TeethReptilesSection,
  FishSection,
  FragmentsSection,
} from "./components/IdentifySections";

export default function Identify() {
  return (
    <IdentifyContainer>
      <IdentifyContentsContainer>
        <h1>Identify</h1>
        <p>
          When starting out, it can be challenging to separate rocks from
          fossils, let alone identify which fossils you've found! However, as
          you become more proficient you will probably start to recognize
          certain fossils which are common to the different samples. Below you
          can find some examples of common fossils found in the Eocene Cypress
          Hills Formation and some diagnostic criteria to help you identify
          them.
        </p>

        <IdentifyNav />

        <TeethMammalsSection />
        <TeethReptilesSection />
        <FishSection />
        <FragmentsSection />
      </IdentifyContentsContainer>
    </IdentifyContainer>
  );
}

const IdentifyContainer = ({ children }) => {
  return <section className={styles.identify}>{children}</section>;
};

const IdentifyContentsContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.identifyContentsContainer}>{children}</div>;
};
