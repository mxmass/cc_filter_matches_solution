import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue';
import Vuetify from 'vuetify';
import User from '@/components/User.vue'

Vue.use(Vuetify);

describe('User.vue', () => {
  it('renders user data when passed', () => {
    const person = {
      _id: '5c8fd7d93a9850001c942cd8',
      display_name: "Caroline",
      age: 41,
      height_in_cm: 153,
      city: {
        name: "Leeds"
      },
      main_photo: "http://thecatapi.com/api/images/get?format=src&type=gif",
      favourite: true,
      religion: "Atheist"
    }
    const wrapper = shallowMount(User, {
      propsData: { user: person }
    })
    expect( wrapper.props().user.display_name ).to.eql( 'Caroline' );
    expect( wrapper.props().user.age ).to.eql( 41 );
    expect( wrapper.props().user.city.name ).to.eql( 'Leeds' );
    const fboxes = wrapper.findAll('v-flex-stub');
    expect( fboxes.length ).to.eql( 2 );
    expect( wrapper.find('strong').text() ).to.eql( 'Caroline' );
    expect( wrapper.find('.userinfo').text() ).to.have.string( 'Caroline\n    (41)\n    from {\n  "name": "Leeds"\n}' );
    expect( wrapper.find('v-icon-stub').text() ).to.eql( 'close' );
    const imageHash = wrapper.props().user.main_photo+'&'+wrapper.props().user._id;
    expect( wrapper.find('avatarimage-stub').attributes().avatar ).to.eql( imageHash );
  })
})
