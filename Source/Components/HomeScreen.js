import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CurrencyConverter from './CurrencyConverter';

const HomeScreen = props => {
  const [firstCountryCurrency, setFirstCountryCurrency] = useState('USD');
  const [secondCountryCurrency, setSecondCountryCurrency] = useState('INR');
  const [firstAmount, setFirstAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [exchangeRate, setExchangeRate] = useState(0);

  const swapCountry = () => {
    firstCountryCurrency = secondCountryCurrency;
  };

  const getExchangeRate = async countryCode => {
    const currURL =
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/' +
      countryCode.toLowerCase() +
      '.json';
    let response = await fetch(currURL);
    return response.json();
  };

  useEffect(() => {
    getExchangeRate('USD').then(res => {
      setExchangeRate(
        res[firstCountryCurrency.toLowerCase()][
          secondCountryCurrency.toLowerCase()
        ],
      );
    });
  }, []);

  const renderSwipeLine = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          marginTop: 30,
        }}>
        <View style={styles.line}></View>
        <TouchableOpacity
          style={styles.logo}
          onPress={() => {
            let a = firstCountryCurrency;
            setFirstCountryCurrency(secondCountryCurrency);
            setSecondCountryCurrency(a);

            getExchangeRate(a).then(res => {
              setExchangeRate(
                res[firstCountryCurrency.toLowerCase()][
                  secondCountryCurrency.toLowerCase()
                ],
              );
            });
          }}>
          <AntDesign
            name="swap"
            color="#fff"
            style={{fontSize: 25, transform: [{rotate: '90deg'}]}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{marginTop: 50, zIndex: 25}}>
        <Text style={styles.mainHeading}>Currency Converter</Text>
        <Text style={styles.description}>
          Check live rates, set ret alerts, recieve notiofications and more
        </Text>
        <View style={styles.midContainer}>
          <Text>Amout</Text>
          <View style={{zIndex: 10}}>
            <CurrencyConverter
              countryCurrency={firstCountryCurrency}
              setCountryCurrency={value => setFirstCountryCurrency(value)}
              amount={firstAmount}
              setAmount={amount => setFirstAmount(amount)}
              showAmount={true}
            />
          </View>
          {renderSwipeLine()}
          <Text style={{marginTop: 30}}> Converted Amount</Text>
          <CurrencyConverter
            countryCurrency={secondCountryCurrency}
            setCountryCurrency={value => setSecondCountryCurrency(value)}
            convertedCurrency={convertedAmount}
          />
        </View>
      </View>
      <View style={{marginTop: 20, zIndex: 2}}>
        <Text>Exchange Rate: {parseInt(exchangeRate)}</Text>
      </View>
      <TouchableOpacity
        style={styles.convertButton}
        onPress={() => {
          getExchangeRate(firstCountryCurrency).then(res => {
            setExchangeRate(
              res[firstCountryCurrency.toLowerCase()][
                secondCountryCurrency.toLowerCase()
              ],
            );
            setConvertedAmount(
              parseInt(
                res[firstCountryCurrency.toLowerCase()][
                  secondCountryCurrency.toLowerCase()
                ] * firstAmount,
              ),
            );
          });
        }}>
        <Text style={{color: '#fff', fontSize: 15, zIndex: 1}}>Convert</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  mainHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1F2261',
    alignSelf: 'center',
  },
  description: {textAlign: 'center', color: '#808080', width: 300},
  midContainer: {
    width: 350,
    height: 300,
    borderWidth: 1,
    marginTop: 50,
    borderRadius: 20,
    padding: 10,
    zIndex: 20,
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
    width: '80%',
  },
  logo: {
    fontSize: 20,
    color: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2261',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  convertButton: {
    marginTop: 20,
    backgroundColor: '#1F2261',
    width: 200,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
