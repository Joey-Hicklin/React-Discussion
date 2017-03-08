import Topic from '../presentationals/topic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function mapStateToProps(state){
	return {
		topic: state.topic
	};
}

export default connect(mapStateToProps)(Topic);
