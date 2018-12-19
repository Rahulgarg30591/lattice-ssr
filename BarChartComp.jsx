import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import { barGraphOpacity } from '../../configurations/config';
import { getBarChartHeight, getBarChartWidth } from '../../helper/resolutionHelper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class BarChartComp extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { chartData: [] };
        this.getInfo = this.getInfo.bind(this);
        this.setWidthHeight = this.setWidthHeight.bind(this);

        this.state = { width: 0, height: 0 };

        this.axisProp = {
            fill: '#dfdfdf',
            fontSize: 12,
            fontFamily: 'Montserrat, sans-serif',
        };
    }

    componentWillMount() {
        this.setState({ chartData: this.props.data });
    }

    componentDidMount() {
        this.setWidthHeight();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
            this.setState({ chartData: nextProps.data });
        }
    }

    /**
     * Sets the width height of the graph on the go.
     */
    setWidthHeight() {
        const {
            parentId,
            isFullScreen,
        } = this.props;

        const width = getBarChartWidth(parentId, isFullScreen);
        const height = getBarChartHeight(isFullScreen);

        this.setState({ width, height });
    }

    /**
     * Get information for the bar chart.
     * @return {Array} [Bar Cells Information]
     */
    getInfo() {
        return this.props.data.map(entry => <Cell key={entry.name} fill={entry.color} />);
    }

    render() {
        const { chartData } = this.state;
        const {
            showXAxis,
            showYAxis,
            leftMargin,
            rightMargin,
            topMargin,
            bottomMargin,
            isTransparent,
            layout,
        } = this.props;

        const cellInfo = this.getInfo();

        let xAxis = (<XAxis tick={false} axisLine={false} height={0} />);
        let yAxis = <YAxis tick={false} axisLine={false} domain={[0, 100]} width={0} />;
        let transparencyStyle = null;

        if (chartData.length === 0) {
            return null;
        }

        if (showXAxis) {
            xAxis = (<XAxis tick={this.axisProp} dataKey="time" />);
        }

        if (showYAxis) {
            yAxis = (<YAxis tick={this.axisProp} domain={[0, 100]} />);
        }

        if (layout === 'vertical') {
            xAxis = (<XAxis
                tick={false}
                axisLine={false}
                domain={[0, 100]}
                dataKey="value"
                type="number"
                height={0}
            />);
            yAxis = <YAxis tick={false} axisLine={false} width={0} dataKey="time" type="category" />;

            if (showXAxis) {
                xAxis = (<XAxis tick={this.axisProp} domain={[0, 100]} dataKey="value" type="number" />);
            }

            if (showYAxis) {
                yAxis = (<YAxis tick={this.axisProp} dataKey="time" type="category" />);
            }
        }

        if (isTransparent) {
            transparencyStyle = { opacity: barGraphOpacity };
        }

        return (
            <BarChart
                width={this.state.width}
                height={this.state.height}
                data={chartData}
                margin={
                    {
                        top: topMargin,
                        right: rightMargin,
                        left: leftMargin,
                        bottom: bottomMargin,
                    }
                }
                style={transparencyStyle}
                layout={layout}
            >
                {xAxis}
                {yAxis}
                <Tooltip wrapperStyle={this.axisProp} animationDuration={100} />
                <Bar dataKey="value" fill="#8884d8" isAnimationActive={false}>
                    {cellInfo}
                </Bar>
            </BarChart>
        );
    }
}

BarChartComp.propTypes = {
    isFullScreen: PropTypes.bool,
    data: PropTypes.array,
    parentId: PropTypes.string,
    showXAxis: PropTypes.bool,
    showYAxis: PropTypes.bool,
    isTransparent: PropTypes.bool,
    leftMargin: PropTypes.number,
    rightMargin: PropTypes.number,
    bottomMargin: PropTypes.number,
    topMargin: PropTypes.number,
    layout: PropTypes.string,
};

BarChartComp.defaultProps = {
    isFullScreen: false,
    showXAxis: true,
    showYAxis: true,
    data: [],
    leftMargin: 0,
    rightMargin: 20,
    bottomMargin: 5,
    topMargin: 5,
    isTransparent: false,
    layout: 'horizontal',
};
