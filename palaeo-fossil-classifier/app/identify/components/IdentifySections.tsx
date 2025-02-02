import { PropsWithChildren } from "react";
import Image from "next/image";
import styles from "./IdentifySections.module.css";
import rodentIncisor1 from "./images/rodent-incisor-1.jpg";
import { Carousel } from "../../components/Carousel";

export const TEETH_MAMMALS_ID = "teeth-mammals";
export const TeethMammalsSection = () => {
  return (
    <IdentifySectionContainer id={TEETH_MAMMALS_ID}>
      <h3>Teeth - Mammals</h3>

      <p>
        Mammal teeth are the most common identifiable bone type found in the
        field. The teeth of mammals are highly specialized and can be used to
        identify the species of the animal they came from. The teeth of mammals
        are divided into four main types: incisors, canines, premolars, and
        molars. With experience, you should be able to identify both the type of
        tooth and the species of mammal it came from! One quick way to identify
        mammalian teeth is to look for the presence of enamel (the hard, outer
        covering of the tooth), which in fossils from this formation is a shiny
        black colour.
      </p>

      <SubSection>
        <h4>Rodents</h4>
        <ImageContainer>
          <Image
            className={styles.floatLeft}
            src={rodentIncisor1}
            height={250}
            width={250}
            alt="Rodent incisor"
          />
        </ImageContainer>
        <p>
          {" "}
          Rodent incisors can be identified because unlike most other teeth, the
          enamel (black portion) is on the front, rather than the top, of the
          tooth.
        </p>
      </SubSection>
      <SubSection>
        <h4>Lagomorphs</h4>
      </SubSection>
      <SubSection>
        <h4>Insectivora</h4>
      </SubSection>
      <SubSection>
        <h4>Carnivorans</h4>
      </SubSection>
    </IdentifySectionContainer>
  );
};

export const TEETH_REPTILES_ID = "teeth-reptiles";
export const TeethReptilesSection = () => {
  return (
    <IdentifySectionContainer id={TEETH_REPTILES_ID}>
      <h3>Teeth - Reptiles</h3>

      <p>
        While it's not uncommon to find reptile teeth in the matrix, unlike
        mammals, it is usually not possible to identify the species of a reptile
        based on the teeth alone. However, in the Cypress Hills formation we get
        both lizard teeth and crocodile teeth, and the two are quite distinct.
      </p>

      <SubSection>
        <h4>Lizards</h4>
      </SubSection>
      <SubSection>
        <h4>Crocodilians</h4>
      </SubSection>
    </IdentifySectionContainer>
  );
};

export const FISH_ID = "fish";
export const FishSection = () => {
  return (
    <IdentifySectionContainer id={FISH_ID}>
      <h3>Fish</h3>
      <p>
        Fish bone can often be recognized by the fact that the bone looks
        'rotten' and full of small holes. The bones are often also very thin and
        fragile, meaning that even if you get some, it can be hard to determine
        which bone it is. The exception to this can be teeth, which are often
        reognizable.
      </p>
      <SubSection>
        <h4>Miscellaneous Fish Bones</h4>
      </SubSection>
      <SubSection>
        <h4>Fish Teeth</h4>
      </SubSection>
      <SubSection>
        <h4>Vertebrae</h4>
      </SubSection>
    </IdentifySectionContainer>
  );
};

export const FRAGMENTS_ID = "fragments";
export const FragmentsSection = () => {
  return (
    <IdentifySectionContainer id={FRAGMENTS_ID}>
      <h3>Fragments and Other Bones</h3>

      <p>
        By far the most common type of bone found in the field is miscellaneous,
        nigh-unidentifiable fragment! These could be shards of much larger bones
        or they could be genuinely small bones which have been worn down by the
        elements.
      </p>

      <SubSection>
        <h4>Fragments</h4>
        <Carousel />
      </SubSection>
      <SubSection>
        <h4>Other Body Elements</h4>
      </SubSection>
      <SubSection>
        <h4>Amber</h4>
      </SubSection>
    </IdentifySectionContainer>
  );
};

const IdentifySectionContainer = ({ children, ...rest }: PropsWithChildren) => {
  return (
    <section {...rest} className={styles.identifySection}>
      {children}
    </section>
  );
};

const SubSection = ({ children }: PropsWithChildren) => {
  return <section className={styles.subsection}>{children}</section>;
};

const ImageContainer = ({ children }: PropsWithChildren) => {
  return <div className={styles.imageContainer}>{children}</div>;
};
