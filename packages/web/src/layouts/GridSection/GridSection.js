import * as React from 'react';
import classNames from 'classnames';
// styles
import './grid-section.sass';

const GridSection = ({ className, heading: Heading, copy: Copy, children }) => (
  <section className={classNames(className, 'gridSection')}>
    {Heading && (
      <h4 className="headline" style={{ margin: 0 }}>
        <Heading />
      </h4>
    )}
    <p className="copy">{Copy && <Copy />}</p>
    {children && <section className="gridSection_children">{children}</section>}
  </section>
);

export default GridSection;
