import styles from "./IdentifyNav.module.css";
import {
  TEETH_MAMMALS_ID,
  TEETH_REPTILES_ID,
  FISH_ID,
  FRAGMENTS_ID,
} from "./IdentifySections";
const navComponents = [
  { label: "Teeth - Mammals", key: TEETH_MAMMALS_ID },
  { label: "Teeth - Reptiles", key: TEETH_REPTILES_ID },
  { label: "Fish", key: FISH_ID },
  {
    label: "Fragments",
    key: FRAGMENTS_ID,
  },
];
export const IdentifyNav = () => {
  return (
    <nav className={styles.identifyNav}>
      <ol>
        {navComponents.map((item) => (
          <li key={item.key}>
            <a href={`#${item.key}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
