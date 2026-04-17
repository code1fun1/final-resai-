import PropTypes from 'prop-types';
import React from 'react';
import Loader from '~/shared/components/Loader';

// ===============================================
// 🔹 Shared state (lives at module level, not per component)
// ===============================================
let activeRequests = 0; // counts how many "start" calls are active
const globalSubscribers = new Set(); // all mounted HOCs that should re-render
//const globalSubscribers = [];
/**
 * Name: withLoader
 * Desc: Provides Loader + injects setLoading/setLoadWithoutMount into wrapped component
 */
function withLoader(TargetComponent) {
  class WithLoader extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        message: ''
      };
      this.isMount = false;
    }

    componentDidMount = () => {
      this.isMount = true;
      // 👇 register this instance as a subscriber
      globalSubscribers.add(this.updateFromGlobal);
    };

    componentWillUnmount = () => {
      this.isMount = false;
      // 👇 remove subscriber when unmounted
      globalSubscribers.delete(this.updateFromGlobal);
      // ✅ reset global counter if no subscribers left
      if (globalSubscribers.size === 0) {
        activeRequests = 0;
      }
    };

    // ===============================================
    // 🔹 Update this instance from global state
    // ===============================================
    updateFromGlobal = (loading, message) => {
      if (this.isMount) {
        this.setState({ loading, message });
      }
    };

    // ===============================================
    // 🔹 Shared global setter (called by all instances)
    // ===============================================
    setLoadWithoutMount = (loading, message = '') => {
      if (loading) {
        activeRequests++;
      } else {
        activeRequests = Math.max(0, activeRequests - 1);
      }

      const showLoader = activeRequests > 0;
      const msg = loading ? message : ''; // only show message while loading

      // 👇 notify all mounted subscribers (all pages)
      globalSubscribers.forEach((cb) => cb(showLoader, msg));
    };

    // ===============================================
    // 🔹 Alias for compatibility
    // ===============================================
    setLoading = (loading, message = '') => {
      this.setLoadWithoutMount(loading, message);
    };

    render() {
      const { loading, message } = this.state;
      //console.log('[WithLoader render] loading:', loading, 'message:', message);

      return (
        <>
          {/* 👇 Loader is shown only once, controlled by global counter */}
          {loading && <Loader pageLoader={true} message={message} />}
          <TargetComponent
            setLoading={this.setLoading}
            setLoadWithoutMount={this.setLoadWithoutMount}
            isLoading={loading}
            {...this.props}
          />
        </>
      );
    }
  }

  return WithLoader;
}

withLoader.propTypes = {
  TargetComponent: PropTypes.element
};

export default withLoader;
