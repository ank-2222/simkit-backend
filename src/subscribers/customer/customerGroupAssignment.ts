import { CustomerGroupService, EventBusService } from "@medusajs/medusa"

type InjectedProperties = {
  eventBusService: EventBusService
  customerGroupService: CustomerGroupService
}

class CustomerGroupAssignmentSubscriber {
  private customerGroupService: CustomerGroupService

  constructor(properties: InjectedProperties) {
    this.customerGroupService = properties.customerGroupService;
    properties.eventBusService.subscribe("customer.created" , this.handleGroupAssignment);
    properties.eventBusService.subscribe("customer.updated", this.handleGroupAssignment);
    properties.eventBusService.subscribe("cart.customer_updated", this.handleGroupAssignment);
  }

  handleGroupAssignment = async (customer) => {
    // List of country codes eligible for free shipping
    const eligibleCountryCodes = ["CA", "PR", "US"];
    
    // Check if the customer's country code is eligible
    if (!eligibleCountryCodes.includes(customer.shipping_address.country_code)) {
      return;
    }

    let customerGroup;
    // Check if "freeshipping" customer group exists
    let customerGroupList = await this.customerGroupService.list({ name: "freeshipping" }, { take: 1 });
    // If it doesn't exist, create it
    if (!customerGroupList.length) {
      customerGroup = await this.customerGroupService.create({ name: "freeshipping" });
    } else {
      customerGroup = customerGroupList[0];
    }
    // Add customer to "freeshipping" customer group
    await this.customerGroupService.addCustomers(customerGroup.id, [customer.id]);
  }
}

export default CustomerGroupAssignmentSubscriber;
