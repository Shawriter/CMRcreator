async function addCustomer(customer) {
    try {
      const result = await window.electron.invoke('add-customer', customer);
      console.log('Customer added with ID:', result.id);
    } catch (err) {
      console.error('Failed to add customer:', err.message);
    }
  }