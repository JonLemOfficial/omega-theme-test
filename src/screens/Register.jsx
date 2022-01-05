"use strict";

import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import ReCaptcha from 'react-google-recaptcha'; 
import { Frame, Page, Layout, Card, FormLayout, TextField, Button, Autocomplete, Toast } from '@shopify/polaris';
import axios from 'axios';

const Register = ( props ) => {
  
  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ reCaptchaToken, setReCaptchaToken ] = useState('');
  const [ sending, setSending ] = useState(false);
  const [ error, setError ] = useState(false);
  const [ sent, setSent ] = useState(false);
  const [ selectedOptions, setSelectedOptions ] = useState([]);
  const [ options, setOptions ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const handleNameChange = useCallback( value => setName(value), []);
  const handlePhoneChange = useCallback( value => setPhone(value), []);
  const handleEmailChange = useCallback( value => setEmail(value), []);
  const handlereCaptchaTokenChange = useCallback( value => setReCaptchaToken(value), []);
  const toggleSent = useCallback(() => setSent( sent => !sent), []);

  const handleAddressChange = useCallback(
    value => {
      setAddress(value);

      if ( !loading ) {
        setLoading(true);
      }

      setTimeout(async () => {
        if ( value === '' ) {
          setOptions([]);
          setLoading(false);
          setError(true);
          return;
        }
        const filterRegex = new RegExp(value, 'i');
        let resultOptions = await axios.get(`/ajax?search=${value}`)
        resultOptions = resultOptions.data.filter(location => (
          location.place_name.match(filterRegex)
        )).map(option => ({
          value: option.place_name, label: option.place_name
        }));
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [ options, loading ],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    if ( name && phone && email && address && reCaptchaToken ) {
      let response = await axios.post("/ajax", { name, phone, email, address, reCaptchaToken });
      if ( response ) {
        setSent(true);
        await setTimeout(() => { setSending(false); }, 3000);
      }
    }
    else {  
      setSending(false);
      setError(true);
    }
  };

  const updateSelection = useCallback(
    selected => {
      const selectedText = selected.map( selectedItem  => {
        const matchedOption = options.find( option => {
          return option.label.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      setSelectedOptions(selected);
      setAddress(selectedText[0]);
    },
    [ options ],
  );

  const toastMarkup = sent ? (
    <Toast content="User registered succesfully" onDismiss={toggleSent} duration={4500} />
  ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={handleAddressChange}
      label="Address"
      value={address}
      {...error && !sending && !address ? {error: "user address is required"} : null}
      placeholder="City, State, Country"/>
  );

  return sent ? (
    <Navigate to="/userlist"/>
  ) : (
    <>
      <Frame>
        <Page
          title="Register form">
          <Layout>
            <Layout.Section
              title="Registered users"
              description="all registered users with their locations">
              <Card sectioned>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      value={name}
                      label="Full name"
                      placeholder="Tom"
                      {...error && !sending && !name ? {error: "name is required"} : null}
                      onChange={handleNameChange}
                      autoComplete="name"/>
                    <TextField
                      value={phone}
                      label="Phone number"
                      {...error && !sending && !phone ? {error: "phone number is required"} : null}
                      placeholder="+1(334)1234567"
                      onChange={handlePhoneChange}
                      autoComplete="phone"/>
                  </FormLayout.Group>

                  <TextField
                    value={email}
                    label="Email"
                    placeholder="example@email.com"
                    {...error && !sending && !email ? {error: "user email is required"} : null}
                    onChange={handleEmailChange}
                    autoComplete="email"/>

                  <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    loading={loading}
                    textField={textField}/>
                  <ReCaptcha
                    sitekey="6LeQleYdAAAAAG-NGKnfl8n9eajxziRTz7VuEoeN"
                    onChange={handlereCaptchaTokenChange}/>

                  <Button
                    primary
                    {...!error && sending && name && email && phone && address ? { disabled: true } : null }
                    onClick={handleSubmit}>
                    { !error && sending && name && email && phone && address ? "Submitting" : "Submit" }
                  </Button>

                  { toastMarkup }
                </FormLayout>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </Frame>
    </>
  );
};

export default Register;