import React, {Component} from "react";

export default class SliderFloatingFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxValue: props.maxValue,
            currentValue: '',
            sugglist: [],
            trueValue: ''
        }
    }
    valueChanged = (event) => {
        this.setState({
                currentValue: event.target.value
            },
            () => {
                this.props.onFloatingFilterChanged({model: this.buildModel()});
            })
    }
    
    handleClick = (event) => {
      let colId = this.props.column.colId
      let sugglist = []
      this.props.api.forEachNodeAfterFilter((node, index)=> sugglist.push(node.data[colId]))
      
      const set1 = new Set([...sugglist]);
 
      let items = [];         
      set1.forEach(a=>items.push(<option key={a} value={a}/>))
      this.setState({
        sugglist: items
      })


    }
    handleInput = (event) => {
      let a = event.target.value.toUpperCase()
      this.setState({
        trueValue: a
      })
    }

    onParentModelChanged(parentModel) {
        // note that the filter could be anything here, but our purposes we're assuming a greater than filter only,
        // so just read off the value and use that
        this.setState({
            currentValue: !parentModel ? '' : parentModel.filter
        });

    }

    buildModel() {
        if (this.state.currentValue === 0) {
            return null;
        }
        return {
            filterType: 'text',
            type: 'contains',
            filter: this.state.currentValue
        };
    }

    render() {
      let uuid = Math.random().toFixed(10).slice(2)
        return (
          <div>
            <input
              list={uuid}
              id="choice"
              value={this.state.trueValue}
              onInput={this.handleInput}
              onChange={this.valueChanged}
              onFocus={this.handleClick}
            />
            <datalist id={uuid}>
              {this.state.sugglist}
            </datalist>
          </div>
        )
    }
}
