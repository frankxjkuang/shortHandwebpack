import config from './../json/config.json';
import React, {Component} from 'react';

class Hello extends Component {
	render() {
		return (
			<div>
			    <img src={require('../images/hi.jpg')} />
				<h1>{config.helloText}</h1>
			</div>
		);
	}
}
export default Hello;