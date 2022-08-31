import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {
        "Continue Watching": [
          {
            img: "https://image.tmdb.org/t/p/original/n9dwu1p5G4qJ4DI5eHJMUbAdOfA.jpg",
            name: "Inception",
            watching: true,
          },
          {
            img: "https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7015_AL_.jpg",
            name: "Inception",
            watching: true,
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
            watching: true,
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
            watching: true,
          },
        ],
        "Trending Now": [
          {
            img: "https://imdb-api.com/images/original/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
        ],
        "Sci-Fi & Fantasy": [
          {
            img: "https://imdb-api.com/images/original/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BNTE1M2NjNDgtYjQ2Ny00YTMzLWJiYWQtMTdmM2Q2YjA1MDg1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMTJiMmE5YWItOWZjYS00YTg0LWE0MTYtMzg2ZTY4YjNkNDEzXkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_Ratio0.7910_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BOWM0YWMwMDQtMjE5NS00ZTIwLWE1NWEtODViMWZjMWI2OTU3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
        ],
        "Crime Thrillers": [
          {
            img: "https://imdb-api.com/images/original/MV5BZjlhNzM4NjItMWRkNi00MWRmLWIzZmEtMmVlNGMwNzU3MmUzXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BZjMzZmIyNjUtNWE3Zi00NjIyLWIyZTUtYzhmY2NlNWU3NTU3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMTJmNGJmYTgtYjAxNy00YmMzLTk2YTYtMGIzMmUwNDMyMTY1XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.7910_AL_.jpg",
            name: "Inception",
          },
        ],
        Drama: [
          {
            img: "https://imdb-api.com/images/original/MV5BMmIwYzFhODAtY2I1YS00ZDdmLTkyYWQtZjI5NDIwMDc2MjEyXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BZTgxMGQ2ZDctYWY4Yy00YTI4LWIxMmYtOWViMGI5ZDIwMmFiXkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BOTI4NDhhNGEtZjQxZC00ZTRmLThmZTctOGJmY2ZlOTc0ZGY0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BYjkwMzIxYzMtOTVkMS00NDQxLThkMjItNzgxN2RiNjdlNTliXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
        ],
        Comedy: [
          {
            img: "https://image.tmdb.org/t/p/original/n9dwu1p5G4qJ4DI5eHJMUbAdOfA.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7015_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
        ],
        Documentries: [
          {
            img: "https://image.tmdb.org/t/p/original/n9dwu1p5G4qJ4DI5eHJMUbAdOfA.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7015_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
          {
            img: "https://imdb-api.com/images/original/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_Ratio0.6716_AL_.jpg",
            name: "Inception",
          },
        ],
      },
    };
  }
  render() {
    let renderMovie = ({ item }) => {
      return (
        <TouchableOpacity style={styles.card}>
          {item.watching && (
            <Ionicons
              style={styles.play}
              name="play-circle-outline"
              size={70}
              color="white"
            />
          )}
          <Image style={styles.thumb} source={{ uri: item.img }} />
        </TouchableOpacity>
      );
    };
    let renderSection = ({ item }) => {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{item}</Text>
          <FlatList
            horizontal
            data={this.state.movies[item]}
            renderItem={renderMovie}
            keyExtractor={i => i.img}
          />
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={30} color="red" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Movie"
          />
        </View>
        <FlatList
          data={Object.keys(this.state.movies)}
          renderItem={renderSection}
          keyExtractor={i => i}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  play: {
    position: "absolute",
    zIndex: 10,
    top: 40,
    left: 30,
  },
  container: {
    margin: 2,
    marginBottom: "15%",
  },
  card: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  thumb: {
    height: 175,
    width: 125,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  movieHeading: {
    color: "white",
    fontFamily: "Poppins-Light",
    fontSize: 18,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    padding: 8,
    margin: 5,
    borderRadius: 5,
  },
  searchInput: {
    width: "90%",
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
  section: {
    margin: 10,
    marginTop: 20,
  },
  sectionHeading: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
});
export default Home;
