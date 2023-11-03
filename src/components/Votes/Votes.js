import React from "react";
import {toast, ToastContainer} from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
	faFaceGrinHearts,
	faFaceGrinSquintTears,
	faFaceKissBeam,
	faFaceLaughSquint,
	faFaceSmile,
	faFaceSmileWink,
	faThumbsDown,
	faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import './votes.css';

class Votes extends React.Component {
	constructor(props) {
		super(props);
		
		const voteOptions = [
			{id: 1, icon: faFaceSmile, color: '#845EC2'},
			{id: 2, icon: faFaceSmileWink, color: '#FFC75F'},
			{id: 3, icon: faFaceLaughSquint, color: '#FF6F91'},
			{id: 4, icon: faFaceKissBeam, color: '#008E9B'},
			{id: 5, icon: faFaceGrinSquintTears, color: '#C34A36'},
			{id: 6, icon: faFaceGrinHearts, color: '#B83FAE'},
		];
		
		this.state = {
			votes: voteOptions.map(option => ({
				id: option.id,
				smile: option.icon,
				color: option.color,
				count: 0,
			}))
		}
	}
	
	handleIncrement = (id) => {
		this.setState(prevState => ({
			votes: prevState.votes.map(vote => (
				vote.id === id ? { ...vote, count: vote.count + 1 } : vote
			))
		}));
		toast.success(`Vote up`, {
			autoClose: 1000,
			pauseOnHover: false,
		})
	};
	
	handleDecrement = (id) => {
		this.setState(prevState => ({
			votes: prevState.votes.map(vote => (
				vote.id === id ? { ...vote, count: vote.count - 1 } : vote
			))
		}));
		toast.error('Vote down', {
			autoClose: 1000,
			pauseOnHover: false,
		})
	};
	
	findWinner = () => {
		const positiveVotes = this.state.votes.filter(vote => vote.count > 0);
		if (positiveVotes.length === 0) {
			toast.info('No winner');
		} else {
			const winner = positiveVotes.reduce((prev, current) => (prev.count > current.count) ? prev : current);
			toast(
				<div className="votes__winner">
					<div>Winner is</div>
					<FontAwesomeIcon icon={winner.smile} color={winner.color} />
				</div>,
			{
				position: "top-center",
			});
		}
	};
	
	
	render() {
		return(
			<div className="votes">
				<div className="votes__wrapper">
					
					{this.state.votes.map(vote => (
						<div className="votes__item" key={vote.id}>
							
							<div className="votes__smile">
								<FontAwesomeIcon icon={vote.smile} color={vote.color} />
							</div>
							
							<div>
								{vote.count}
							</div>
							
							<div className="votes__buttons-wrapper">
								<button className="votes__button" onClick={() => this.handleIncrement(vote.id)}>
									<FontAwesomeIcon icon={faThumbsUp} color='#00b700'/>
								</button>
								<button className="votes__button" onClick={() => this.handleDecrement(vote.id)}>
									<FontAwesomeIcon icon={faThumbsDown} color='#c20000'/>
								</button>
							</div>
							
						</div>
					))}
					
				</div>
				
				<div className="votes__result">
					<button className="votes__btn-winner" onClick={this.findWinner}>Show winner</button>
				</div>
				
				<ToastContainer />
			</div>
		)
	}
}

export default Votes;