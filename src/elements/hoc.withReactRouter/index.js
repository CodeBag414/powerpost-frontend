import React, { PropTypes } from 'react';
import classnames from 'classnames';

const withReactRouter = (Component) =>
  class Decorated extends React.Component {
    static propTypes = {
      activeClassName: PropTypes.string,
      className: PropTypes.string,
      to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      parentActive: PropTypes.bool,
    }

    static defaultProps = {
      parentActive: false,
    }

    static contextTypes = {
      router: PropTypes.object,
    };

    resolveToLocation = (to) => {
      const { router } = this.context;
      return typeof to === 'function' ? to(router.location) : to;
    }

    handleClick = (event) => {
      const { to } = this.props;
      const { router } = this.context;
      event.preventDefault();
      router.push(this.resolveToLocation(to));
    }

    render() {
      const { router } = this.context;
      const { activeClassName, className, to, parentActive, ...rest } = this.props;
      const toLocation = this.resolveToLocation(to);
      let isActive;
      if (!parentActive) {
        isActive = router.isActive(toLocation);
      } else {
        const currentPath = router.getCurrentLocation().pathname;
        isActive = currentPath.indexOf(toLocation) !== -1;
      }

      const newClassName = classnames(className, { [activeClassName]: isActive });

      return (
        <Component
          {...rest}
          className={newClassName}
          href={toLocation}
          onClick={this.handleClick}
        />
      );
    }
  };

export default withReactRouter;
