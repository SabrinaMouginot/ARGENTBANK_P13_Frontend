import PropTypes from 'prop-types';

const FeatureItem = ({ icon, title, children }) => {
  return (
    <div className="feature-item">
      <img src={icon} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
};

FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FeatureItem;
