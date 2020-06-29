import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Segment, Table, Label } from 'semantic-ui-react'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			hunting: false,
			hunts: [],
			tsv:  Math.floor(1 + Math.random() * (4096 - 1)),
			charm: false,
			masuda: false,
			help: false
		}
		this._startHunt = this._startHunt.bind(this)
		this._hunt = this._hunt.bind(this)
		this._shiny = this._shiny.bind(this)
		this._masuda = this._masuda.bind(this)
	}
	_shiny()
	{
		var shiny = this.state.charm
		this.setState({ charm: !shiny})
	}
	_masuda()
	{
		var masuda = this.state.masuda
		this.setState({ masuda: !masuda})
	}
	render() {
		return (
			<Grid>
				<Grid.Row>
					{this.state.help &&
					<Grid.Column width={4} color="black">
					</Grid.Column>
					}
					<Grid.Column width={this.state.help ? 12 : 16}>
						<Grid>

							<Grid.Row>
								<Grid.Column textAlign='center'>
									<h1>Your TSV: {this.state.tsv}</h1>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column textAlign='center' width={6} />
								<Grid.Column textAlign='center' width={2}>
									<label>
									Shiny Charm:
									<input
										name="shiny"
										type="checkbox"
										checked={this.state.charm}
										onChange={this._shiny} />
									</label>
								</Grid.Column>
								<Grid.Column textAlign='center' width={2}>
									<label>
									Masuda Method:
									<input
										name="masuda"
										type="checkbox"
										checked={this.state.masuda}
										onChange={this._masuda}/>
									</label>
								</Grid.Column>
								<Grid.Column textAlign='center' width={6} />
							</Grid.Row>
							<Grid.Row>
								<Grid.Column textAlign='center'>
									{!this.state.hunting &&
										<button onClick={this._startHunt}>Hunt</button>
									}
									<div>{this.state.hunting ? "Hunting..." : ""}</div>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column textAlign='center'>
										{this.state.hunts != 0 &&
											<Segment basic padded='very'>
												<Table celled>
													{this._header()}
													<Table.Body>
														{this.state.hunts.map((h, index) => (
															<Table.Row key={index}>
																<Table.Cell><Label ribbon>{index + 1}</Label></Table.Cell>
																{
																	h.map((r, run) =>
																	(<Table.Cell key={run}>{r}</Table.Cell>))
																}
															</Table.Row>
														))}
													</Table.Body>
												</Table>
											</Segment>									
										}
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	_header()
	{
		if(this.state.charm && this.state.masuda)
			return(
				<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Egg</Table.HeaderCell>
					<Table.HeaderCell>Roll 1</Table.HeaderCell>
					<Table.HeaderCell>Roll 2</Table.HeaderCell>
					<Table.HeaderCell>Roll 3</Table.HeaderCell>
					<Table.HeaderCell>Roll 4</Table.HeaderCell>
					<Table.HeaderCell>Roll 5</Table.HeaderCell>
					<Table.HeaderCell>Roll 6</Table.HeaderCell>
					<Table.HeaderCell>Roll 7</Table.HeaderCell>
					<Table.HeaderCell>Roll 8</Table.HeaderCell>
				</Table.Row>
				</Table.Header>)
		if(!this.state.charm && this.state.masuda)
			return(
				<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Egg</Table.HeaderCell>
					<Table.HeaderCell>Roll 1</Table.HeaderCell>
					<Table.HeaderCell>Roll 2</Table.HeaderCell>
					<Table.HeaderCell>Roll 3</Table.HeaderCell>
					<Table.HeaderCell>Roll 4</Table.HeaderCell>
					<Table.HeaderCell>Roll 5</Table.HeaderCell>
					<Table.HeaderCell>Roll 6</Table.HeaderCell>
				</Table.Row>
				</Table.Header>)
		if(this.state.charm && !this.state.masuda)
			return(
				<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Egg</Table.HeaderCell>
					<Table.HeaderCell>Roll 1</Table.HeaderCell>
					<Table.HeaderCell>Roll 2</Table.HeaderCell>
					<Table.HeaderCell>Roll 3</Table.HeaderCell>
				</Table.Row>
				</Table.Header>)
		if(!this.state.charm && !this.state.masuda)
			return(
				<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Egg</Table.HeaderCell>
					<Table.HeaderCell>Result</Table.HeaderCell>
				</Table.Row>
				</Table.Header>)
	}
	_startHunt()
	{
		this.setState({hunting : true, hunts: []})
		setTimeout(() =>{
			this._hunt()
		} , 100)
	}
	_hunt()
	{
		var found = false
		var rolls = []
		var reroll= 1
		if(this.state.charm)
			reroll += 2
		if(this.state.masuda)
			reroll += 5
		for(var i = 0 ; i < reroll ; i++)
		{
			var shiny = Math.floor(1 + Math.random() * (4096 - 1))
			rolls.push(shiny)
			if(shiny == this.state.tsv)
			{
				found = true;
				this.setState({hunting : false})
				break;
			}
		}
		var hunts = this.state.hunts
		hunts.push(rolls)
		this.setState({hunts : hunts}, () =>{window.scrollTo(0,document.body.scrollHeight)})
		if(!found)
		{
			setTimeout(() =>{
				this._hunt()
			} , 0)
		}
	}
}
export default App;