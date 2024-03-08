import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {countries} from './constants';

const CurrencyConverter = props => {
  const {
    countryCurrency,
    setCountryCurrency,
    amount,
    setAmount,
    showAmount,
    convertedCurrency,
  } = props;
  const [caretIcon, setCaretIcon] = useState('down');

  const [cList, setCList] = useState(false);
  const [listData, setListData] = useState(countries);

  const search = text => {
    let newData = countries.filter(item => {
      return item.country.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    setListData(newData);
  };

  const countryList = () => {
    setCList(!cList);
    setCaretIcon(!cList ? 'up' : 'down');
  };

  const getCountryFlag = countryCode => {
    const getCountryISOCode = countries.filter(
      item => item.currency_code == countryCode,
    )[0];
    return `https://flagsapi.com/${getCountryISOCode.iso}/shiny/64.png`;
  };
  return (
    <View style={styles.fromContainer}>
      <View style={styles.flagImageContainer}>
        <Image
          style={styles.countryFlag}
          source={{uri: getCountryFlag(countryCurrency)}}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.countryListButton} onPress={countryList}>
          {countryCurrency}
          <AntDesign style={styles.countryListButton} name={caretIcon} />
        </Text>
      </TouchableOpacity>

      {cList ? (
        <View style={styles.countryList}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#fff'}
            style={{
              borderWidth: 0.5,
              borderColor: 'white',
              padding: 5,
              borderRadius: 5,
              color: '#fff',
            }}
            onChangeText={text => {
              search(text);
            }}
          />

          <FlatList
            data={listData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    color: 'white',
                    paddingVertical: 5,
                    padding: 10,
                  }}
                  onPress={() => {
                    setCountryCurrency(item.currency_code);
                    setCList(false);
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    {item.currency_code} - {item.country}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            style={{marginTop: 10}}
          />
        </View>
      ) : null}
      {showAmount && (
        <TextInput
          value={amount}
          onChangeText={text => setAmount(text)}
          placeholder="Enter Amount"
          style={styles.amountInput}
          placeholderTextColor={'white'}
        />
      )}
      {!showAmount && convertedCurrency != '' ? (
        <Text>{convertedCurrency}</Text>
      ) : null}
    </View>
  );
};
export default CurrencyConverter;

const styles = StyleSheet.create({
  countryFlag: {
    width: 50,
    height: 50,
  },
  flagImageContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    resizeMode: 'stretch',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
  },
  countryListButton: {fontSize: 20, fontWeight: 'bold', color: '#1F2261'},
  amountInput: {
    backgroundColor: '#808080',
    width: 150,
    height: 40,
    borderRadius: 10,
    padding: 10,
  },
  countryList: {
    padding: 5,
    width: 200,
    height: 150,
    backgroundColor: '#565a61',
    position: 'absolute',
    borderRadius: 10,
    top: 65,
    left: 70,
    zIndex: 20,
  },
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 20,
  },
});
