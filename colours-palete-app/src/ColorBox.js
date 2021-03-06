import React, { Component } from 'react'
import {Link} from "react-router-dom";
import './ColorBox.css';
import chroma from "chroma-js";
//Clipboard Usability
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withStyles} from '@material-ui/styles';

//CSS
const styles = {
  copiedColor: {
    color: props => chroma(props.background).luminance() <= .4 ? "white" : "black"
  },
  colorName:{
    color: props => chroma(props.background).luminance() <= .4 ? "white" : "black"
  }
}
class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      copied: false
    }
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  //ON Change Copy Clipboard Functionality
  changeCopyState(){
    this.setState({
      copied : true
    },
    () => {
      setTimeout(() => this.setState({ copied : false}), 1500);
    });
  }
  render() {
    //Props
    const {name , background , paletteId, color , showLink ,classes} = this.props;
    //luminance
    // const isDark = chroma(background).luminance() <= 0.4; Other way of doing it
    //Clipboard
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{background}}>
          {/* Scale CSS Animation on CopyCLick */}
          <div className={`OverlayInCopy ${this.state.copied && "show"}`} style={{ background }}/>
          <div className={`Overlay-msg ${this.state.copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={classes.copiedColor}>
              {this.props.background}
            </p>
          </div>
          {/* Scale CSS Animation on CopyCLick END*/}
          <div className="ColorBox-copy">
            <div className="ColorBox-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={`ColorBox-copyBtn ${classes.colorName}`}>Copy</button>
          </div>
          {showLink && 
          <Link to={`/palette/${paletteId}/${color}`} onClick={e => e.stopPropagation()}> 
            <span className={`ColorBox-more ${classes.colorName}`} >More</span>
          </Link>
          }
        </div>
      </CopyToClipboard>
    )
  }
}
export default withStyles(styles)(ColorBox);
