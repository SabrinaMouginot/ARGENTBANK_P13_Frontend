import PropTypes from 'prop-types';

function FeatureItem({ imgSrc, title, description }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

FeatureItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureItem;
