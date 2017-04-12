import styled from 'styled-components';

export default styled.div`
  border-bottom: 1px solid #bac1c4;
  position: relative;
  cursor: pointer;

  a {
  	padding: 10px 0;
		width: 100%;
		height: 100%;
		background: transparent;
		margin: 0;
		border: none;
		text-align: left;
		display: block;
		line-height: 18px;

		&:hover {
			background: rgba(255,255,255, .5) !important;
		}
  }
  &:last-child {
  	border-bottom: none;
  }

  .brand {
  	width: 100%;
  	height: 100%;
  	background: transparent;

  	.item {
			display: inline-block;
			img {
			  width: 50px;
			  height: 50px;
			  border-radius: 4px;
			 	margin-right: 15px;
			  display: inline-block;
			}
			div {
			  display: inline-block;
			  height: 50px;
			  vertical-align: middle;
			  padding: 5px 0;
			  p {
			  	font-size: 13px;
			  	margin: 2px 0;
			  	&.itemTitle {
			  		color: #616161;
			  	}
			  }
			}
  	}
  }

  .itemLink {
		height: 70px;
		position: absolute;
		top: 0;
		right: 0;
		padding: 10px 0;
		display: inline-block;

	  a {
	  	width: 40px;
			height: 40px;
	  	border-radius: 50px;
	  }

		i {
			text-align: center;
	    width: 100%;
		}

		.link {
      width: 40px;
      height: 40px;
      font-size: 20px;
      background: transparent;
      display: inline-block;
      margin-left: 15px;
      margin-top: 5px;
      box-shadow: none;
      &:hover {
      	box-shadow: 0px 2px 5px #aaa;
      }
		}
	}
`;
