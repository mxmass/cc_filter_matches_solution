import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue';
import Vuetify from 'vuetify';
import ListItem from '@/components/List/Item.vue'

Vue.use(Vuetify);

describe('List/Item.vue', () => {
  it('renders list item data when passed', () => {
    const person = {
      _id: '5c8fd7d93a9850001c942cd8',
      display_name: "Caroline",
      age: 41,
      height_in_cm: 153,
      city: {
        name: "Leeds"
      },
      favourite: true,
      religion: "Atheist"
    }
    const wrapper = shallowMount(ListItem, {
      propsData: { user: person }
    })
    expect( wrapper.props().user.display_name ).to.eql( 'Caroline' );
    expect( wrapper.props().user.age ).to.eql( 41 );
    expect( wrapper.props().user.city.name ).to.eql( 'Leeds' );
    expect( wrapper.props().user.favourite ).to.eql( true );
    expect( wrapper.find('strong').text() ).to.eql( 'Caroline' );
    expect( wrapper.find('.grey--text').text() ).to.eql( '(41)' );
    expect( wrapper.find('v-chip-stub').text() ).to.have.string( 'Leeds' );
    expect( wrapper.find('v-icon-stub').text() ).to.eql( 'grade' );
    const fboxes = wrapper.findAll('v-flex-stub');
    expect( fboxes.length ).to.eql( 3 );
    expect( fboxes.at(2).text() ).to.eql( 'Atheist, 153cm tall' );
  })
})
