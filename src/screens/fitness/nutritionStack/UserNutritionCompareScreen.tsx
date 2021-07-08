import React, {useEffect} from "react"
import {Dimensions, View} from "react-native";
import {LineChart} from "react-native-chart-kit";

const UserNutritionCompareScreen = ({route, navigation,}: { route: any; navigation: any; }) => {
    useEffect(() => {

        const {fieldData} = route.params.fieldData;
        console.log("fieldInfo", fieldData)

        //  setFieldInfo(fieldInfo);

    }, []);

   const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    return (
      <View>
          <LineChart
            data={data}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
          />
      </View>
    )
}
export default UserNutritionCompareScreen;
