import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import DisplacementSphere from '@utils/animation/DisplacementSphere';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    color: var(--white);
  }

  h3 {
    margin-top: 10px;
    color: var(--white);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 600px;
    color: var(--white);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 20px;
    margin-right: 30px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <h1>
      Hi there!{' '}
      <span role="img" aria-label="waving-hand">
        👋🏼
      </span>
    </h1>
  );
  const two = <h2 className="big-heading">I'm Sanket Sapkal.</h2>;
  const three = <h3 className="big-heading">Software Engineer.</h3>;
  //   TODO: Try to add a abstract wallpaper background to the website.
  const four = (
    <p>
      I'm currently pursuing Masters in Computer Science from University of Southern California. I
      am looking for Software Development Internships for Summer 2022.
    </p>
  );
  const five = (
    <div>
      {/* TODO: Later link the button to contact form instead of email */}
      <a href={`mailto:${email}`} className="email-link">
        Get In Touch
      </a>
      <a className="email-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        Resume
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <>
          <DisplacementSphere />
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
