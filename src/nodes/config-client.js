<style>
.red-ui-help dl.message-properties>dt {
    white-space: normal;
}
</style>

<script type="text/x-red" data-template-name="victron-client">

  <div class="form-row">
    <label style="min-width:190px" for="node-config-input-showValues"><i class="fa fa-eye"></i> Show values</label>
    <input type="checkbox" checked id="node-config-input-showValues" style="max-width:30px">
    <div class="info-text">
    Show the last read/written values in the flow instead of "Ok" and "Connected". <br />
    Note that it will show the last valid received value, even if there is an issue and new data is not being sent.
  </div>
  <div class="form-row">
    <label style="min-width:190px" for="node-config-input-contextStore"><i class="fa fa-database"></i> Context store</label>
    <input type="checkbox" checked id="node-config-input-contextStore" style="max-width:30px">
    <div class="info-text">
    Store the last read value into the (global) context.
  </div>
</script>

<script type="text/x-red" data-help-name="victron-client">
    <p>
        The Victron Energy Configuration Node is a common
        node providing access to the system dbus for all
        other nodes.

        The Configuration Node is always automatically (re-)created.
    </p>

    <p>
Like the Venus OS GUI, all of the Node-RED Victron Energy nodes
read and write from and to the <i>dbus</i>. This means that selectable
options are <strong>only available</strong> if they also exist on the
dbus.
    </p>

    <p>
As with other Node-RED nodes, Victron Energy nodes consist of input-
and output nodes, where we consider the input to be fetchable information
supplied from the dbus system. Output nodes can write to the dbus system
and thus alter its settings.
   </p>

   <p>
The source code of the Victron Energy nodes can be found <a
href="https://github.com/victronenergy/node-red-contrib-victron">here</a>.
Please submit issues and feature requests to the issue tracker there.
   </p>

   <p>
Questions can also be asked on the Victron Energy community:
<a href="https://community.victronenergy.com/">https://community.victronenergy.com/</a>
   </p>
</script>

<script type="text/javascript">
    "use strict";

    RED.nodes.registerType('victron-client', {
        category: 'config',
        color: '#a6bbcf',
        defaults: {
          showValues: { value: false },
          contextStore: {value: true }
        },
        label: function label() {
            return "Victron Energy Client";
        },
        hasUsers: false,
        onpaletteremove: function onpaletteremove() {
            RED.nodes.eachConfig(function (n) {
                if (n.id === 'victron-client') RED.nodes.remove(n.id);
            });
            RED.nodes.dirty(true);
        }
    });
</script>

<script type="text/x-red" data-help-name="victron-input-custom">
  <h3>Details</h3>

  <p>A custom input node looks at the found services and paths on the dbus. This is particularly handy when you need information from
    a service/path that is not available (yet) in an existing node.<br />
    Downside of using the custom node is that there is no guarantee
    that the service and path will remain existent with firmware updates. It also requires more knowledge of the underlying system as
    the services and paths for the custom nodes don't come with documentation.
  </p>

  <p>
    In order to check what type of value is used, the javascript <code>typeof</code> function is used on a cached value of the service/path.
    If that returns a "number", the value allows for rounding (even if it is an integer).
  </p>

  <p>Please check the Venus documentation on used dbus services and paths for more information and valid values.
  </p>

  <h3>References</h3>

  <p>Please use either the issues on the GitHub site or the Node-RED space on our community for questions, troubleshooting and suggestions.</p>

  <ul>
    <li><a href="https://github.com/victronenergy/venus/wiki/dbus">Documentation</a> - Venus documentation on used dbus services and available paths</li>
    <li><a href="https://community.victronenergy.com/smart-spaces/71/node-red.html">Community</a> - Node-RED space in the Victron Energy community</li>
  </ul>

</script>

<script type="text/x-red" data-help-name="victron-output-custom">
  <h3>Details</h3>

  <p>A custom output node can use the found services and paths on the dbus for writing to. This is particularly handy when you need
    to write to a service/path that is not available (yet) in an existing node.<br />
    Downside of using the custom node is that there is no
    guarantee that the service and path will remain existent with firmware updates. It also requires more knowledge of the underlying
    system as the services and paths for the custom nodes don't come with documentation. There are services and paths that are not
    supposed to be written to by third party services.
  </p>

  <p>Please check the Venus documentation on used dbus services and paths for more information and valid values.
  </p>

  <h3>Custom fields</h3>

  <p>By setting <code>msg.path</code> to a value as well, you can overrule the path that is being used on the dbus. This allows for
  less nodes to be needed when creating a flow. When a custom <code>msg.path</code> is being used, the status will show a green
  ring (where it otherwise shows a green dot).</p>

  <h3>References</h3>

  <p>Please use either the issues on the GitHub site or the Node-RED space on our community for questions, troubleshooting and suggestions.</p>

  <ul>
    <li><a href="https://github.com/victronenergy/venus/wiki/dbus">Documentation</a> - Venus documentation on used dbus services and available paths</li>
    <li><a href="https://community.victronenergy.com/smart-spaces/71/node-red.html">Community</a> - Node-RED space in the Victron Energy community</li>
  </ul>
</script>

<!-- # The rest of the file has been generated from services.json -->
<script type="text/x-red" data-help-name="victron-input-accharger">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>The AC charger can be read with this node.</p>
<h3>Charger</h3>
<dl class="message-properties">
  <dt class="optional">AC Current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/CurrentLimit</b>
</dd>
  <dt class="optional">AC Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/L1/I</b>
</dd>
  <dt class="optional">AC Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/L1/P</b>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Output 1 - current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Output 1 - temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Output 1 - voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Output 2 - current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Current</b>
</dd>
  <dt class="optional">Battery 1 temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Temperature</b>
</dd>
  <dt class="optional">Output 2 - voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Output 3 - current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/2/Current</b>
</dd>
  <dt class="optional">Battery 2 temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/2/Temperature</b>
</dd>
  <dt class="optional">Output 3 - voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/2/Voltage</b>
</dd>
  <dt class="optional">Error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No error</li>
  <li>1 - Err 1: Battery temperature too high</li>
  <li>2 - Err 2: Battery voltage too high</li>
  <li>3 - Err 3: Battery temperature sensor miswired (+)</li>
  <li>4 - Err 3: Battery temperature sensor miswired (-)</li>
  <li>5 - Err 5: Battery temperature sensor disconnected</li>
  <li>6 - Err 6: Battery voltage sense miswired (+)</li>
  <li>7 - Err 7: Battery voltage sense miswired (-)</li>
  <li>8 - Err 8: Battery voltage sense disconnected</li>
  <li>9 - Err 9: Battery voltage wire losses too high</li>
  <li>17 - Err 17: Charger temperature too high</li>
  <li>18 - Err 18: Charger over-current</li>
  <li>19 - Err 19: Charger current polarity reversed</li>
  <li>20 - Err 20: Bulk time limit reached</li>
  <li>22 - Err 22: Charger temperature sensor miswired</li>
  <li>23 - Err 23: Charger temperature sensor disconnected</li>
  <li>34 - Err 34: Input current too high</li>
  <li>67 - Err 67: No BMS</li>
</ul>
</dd>
  <dt class="optional">Charger on/off<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Charge state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>2 - Fault</li>
  <li>3 - Bulk</li>
  <li>4 - Absorption</li>
  <li>5 - Float</li>
  <li>6 - Storage</li>
  <li>7 - Equalize</li>
  <li>11 - Power supply mode</li>
  <li>246 - Repeated absorption</li>
  <li>247 - Equalize</li>
  <li>248 - Battery safe</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-acload">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node allows for AC load monitoring. Measuring can be done by using an energy meter and assigning it the 'ac load' role.</p>
<h3>Acload</h3>
<dl class="message-properties">
  <dt class="optional">L1 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Current</b>
</dd>
  <dt class="optional">L1 Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Energy/Forward</b>
</dd>
  <dt class="optional">L1 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Power</b>
</dd>
  <dt class="optional">L1 Voltage (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Voltage</b>
</dd>
  <dt class="optional">L2 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Current</b>
</dd>
  <dt class="optional">L2 Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Energy/Forward</b>
</dd>
  <dt class="optional">L2 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Power</b>
</dd>
  <dt class="optional">L2 Voltage (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Voltage</b>
</dd>
  <dt class="optional">L3 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Current</b>
</dd>
  <dt class="optional">L3 Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Energy/Forward</b>
</dd>
  <dt class="optional">L3 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Power</b>
</dd>
  <dt class="optional">L3 Voltage (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Voltage</b>
</dd>
  <dt class="optional">Serial number<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Serial</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-alternator">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node allows for monitoring the state of BMVs configured in Monitor Mode and DC meter type is Alternator or an alternator controller which is interfaced to the Venus OS.</p>
<h3>Alternator</h3>
<dl class="message-properties">
  <dt class="optional">High auxiliary voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighStarterVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low auxiliary voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowStarterVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Auxiliary voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Input voltage (before DC/DC converter) (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/In/V</b>
</dd>
  <dt class="optional">Input power (W DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/In/P</b>
</dd>
  <dt class="optional">Engine speed (RPM)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/Speed</b>
</dd>
  <dt class="optional">Alternator error code<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>12 - High battery temperature</li>
  <li>13 - High battery voltage</li>
  <li>14 - Low battery voltage</li>
  <li>15 - VBat exceeds $CPB</li>
  <li>21 - High alternator temperature</li>
  <li>22 - Alternator overspeed</li>
  <li>24 - Internal error</li>
  <li>41 - High field FET temperature</li>
  <li>42 - Sensor missing</li>
  <li>43 - Low VAlt</li>
  <li>44 - High Voltage offset</li>
  <li>45 - VAlt exceeds $CPB</li>
  <li>53 - Battery instance out of range</li>
  <li>54 - Too many BMSes</li>
  <li>55 - AEBus fault</li>
  <li>56 - Too many Victron devices</li>
  <li>91 - BMS lost</li>
  <li>92 - Forced idle</li>
  <li>201 - DCDC converter fail</li>
  <li>51-52 - Battery disconnect request</li>
  <li>58-61 - Battery requested disconnection</li>
  <li>201-207 - DCDC error</li>
</ul>
</dd>
  <dt class="optional">Alternator Field Drive %<span class="property-type">float</dt>
  <dd>Dbus path: <b>/FieldDrive</b>
</dd>
  <dt class="optional">Cumulative amp-hours charged (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Cumulative/User/ChargedAh</b>
</dd>
  <dt class="optional">Total energy produced (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/EnergyOut</b>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
  <dt class="optional">Alternator speed (RPM)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Speed</b>
</dd>
  <dt class="optional">Alternator state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>2 - Fault</li>
  <li>3 - Bulk</li>
  <li>4 - Absorption</li>
  <li>5 - Float</li>
  <li>6 - Storage</li>
  <li>7 - Equalize</li>
  <li>11 - Psu</li>
  <li>252 - External control</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-battery">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node allows for monitoring the state of the battery.</p>
<h3>Battery</h3>
<dl class="message-properties">
  <dt class="optional">Alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Alarm</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Cell Imbalance alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/CellImbalance</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Fuse blown alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/FuseBlown</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High charge current alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighChargeCurrent</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High charge temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighChargeTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High discharge current alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighDischargeCurrent</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High fused-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighFusedVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High internal-temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighInternalTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High starter-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighStarterVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Internal failure<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/InternalFailure</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low cell voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowCellVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Almost discharged</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low charge temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowChargeTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low fused-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowFusedVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low state-of-charge alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowSoc</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low starter-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowStarterVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Mid-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/MidVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Balancing<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Balancing</b>
<ul>
  <li>0 - Inactive</li>
  <li>1 - Active</li>
</ul>
</dd>
  <dt class="optional">Capacity (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Capacity</b>
</dd>
  <dt class="optional">Consumed Amphours (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ConsumedAmphours</b>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Mid-point voltage of the battery bank (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/MidVoltage</b>
</dd>
  <dt class="optional">Mid-point deviation of the battery bank (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/MidVoltageDeviation</b>
</dd>
  <dt class="optional">Battery power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Power</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Starter battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Diagnostics; 1st last error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/1/Error</b>
<ul>
  <li>0 - No error</li>
  <li>1 - Battery initialization error</li>
  <li>2 - No batteries connected</li>
  <li>3 - Unknown battery connected</li>
  <li>4 - Different battery type</li>
  <li>5 - Number of batteries incorrect</li>
  <li>6 - Lynx Shunt not found</li>
  <li>7 - Battery measure error</li>
  <li>8 - Internal calculation error</li>
  <li>9 - Batteries in series not ok</li>
  <li>10 - Number of batteries incorrect</li>
  <li>11 - Hardware error</li>
  <li>12 - Watchdog error</li>
  <li>13 - Over voltage</li>
  <li>14 - Under voltage</li>
  <li>15 - Over temperature</li>
  <li>16 - Under temperature</li>
  <li>17 - Hardware fault</li>
  <li>18 - Standby shutdown</li>
  <li>19 - Pre-charge charge error</li>
  <li>20 - Safety contactor check error</li>
  <li>21 - Pre-charge discharge error</li>
  <li>22 - ADC error</li>
  <li>23 - Slave error</li>
  <li>24 - Slave warning</li>
  <li>25 - Pre-charge error</li>
  <li>26 - Safety contactor error</li>
  <li>27 - Over current</li>
  <li>28 - Slave update failed</li>
  <li>29 - Slave update unavailable</li>
  <li>30 - Calibration data lost</li>
  <li>31 - Settings invalid</li>
  <li>32 - BMS cable</li>
  <li>33 - Reference failure</li>
  <li>34 - Wrong system voltage</li>
  <li>35 - Pre-charge timeout</li>
</ul>
</dd>
  <dt class="optional">Diagnostics; 1st last error timestamp<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/1/Time</b>
</dd>
  <dt class="optional">Diagnostics; 2nd last error<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/2/Error</b>
</dd>
  <dt class="optional">Diagnostics; 2nd last error timestamp<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/2/Time</b>
</dd>
  <dt class="optional">Diagnostics; 3rd last error<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/3/Error</b>
</dd>
  <dt class="optional">Diagnostics; 3rd last error timestamp<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/3/Time</b>
</dd>
  <dt class="optional">Diagnostics; 4th last error<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/4/Error</b>
</dd>
  <dt class="optional">Diagnostics; 4th last error timestamp<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/LastErrors/4/Time</b>
</dd>
  <dt class="optional">Diagnostics; shutdowns due to error (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Diagnostics/ShutDownsDueError</b>
</dd>
  <dt class="optional">Error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No error</li>
  <li>1 - Battery initialization error</li>
  <li>2 - No batteries connected</li>
  <li>3 - Unknown battery connected</li>
  <li>4 - Different battery type</li>
  <li>5 - Number of batteries incorrect</li>
  <li>6 - Lynx Shunt not found</li>
  <li>7 - Battery measure error</li>
  <li>8 - Internal calculation error</li>
  <li>9 - Batteries in series not ok</li>
  <li>10 - Number of batteries incorrect</li>
  <li>11 - Hardware error</li>
  <li>12 - Watchdog error</li>
  <li>13 - Over voltage</li>
  <li>14 - Under voltage</li>
  <li>15 - Over temperature</li>
  <li>16 - Under temperature</li>
  <li>17 - Hardware fault</li>
  <li>18 - Standby shutdown</li>
  <li>19 - Pre-charge charge error</li>
  <li>20 - Safety contactor check error</li>
  <li>21 - Pre-charge discharge error</li>
  <li>22 - ADC error</li>
  <li>23 - Slave error</li>
  <li>24 - Slave warning</li>
  <li>25 - Pre-charge error</li>
  <li>26 - Safety contactor error</li>
  <li>27 - Over current</li>
  <li>28 - Slave update failed</li>
  <li>29 - Slave update unavailable</li>
  <li>30 - Calibration data lost</li>
  <li>31 - Settings invalid</li>
  <li>32 - BMS cable</li>
  <li>33 - Reference failure</li>
  <li>34 - Wrong system voltage</li>
  <li>35 - Pre-charge timeout</li>
</ul>
</dd>
  <dt class="optional">Automatic syncs (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/AutomaticSyncs</b>
</dd>
  <dt class="optional">Average discharge (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/AverageDischarge</b>
</dd>
  <dt class="optional">Charge cycles (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/ChargeCycles</b>
</dd>
  <dt class="optional">Charged Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/ChargedEnergy</b>
</dd>
  <dt class="optional">Deepest discharge (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/DeepestDischarge</b>
</dd>
  <dt class="optional">Discharged Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/DischargedEnergy</b>
</dd>
  <dt class="optional">Full discharges (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/FullDischarges</b>
</dd>
  <dt class="optional">High fused-voltage alarms (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/HighFusedVoltageAlarms</b>
</dd>
  <dt class="optional">High starter voltage alarms (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/HighStarterVoltageAlarms</b>
</dd>
  <dt class="optional">High voltage alarms (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/HighVoltageAlarms</b>
</dd>
  <dt class="optional">Last discharge (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/LastDischarge</b>
</dd>
  <dt class="optional">Low fused-voltage alarms (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/LowFusedVoltageAlarms</b>
</dd>
  <dt class="optional">Low starter voltage alarms (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/LowStarterVoltageAlarms</b>
</dd>
  <dt class="optional">Low voltage alarms (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/LowVoltageAlarms</b>
</dd>
  <dt class="optional">History; Max cell-voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MaximumCellVoltage</b>
</dd>
  <dt class="optional">Maximum fused voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MaximumFusedVoltage</b>
</dd>
  <dt class="optional">Maximum starter voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MaximumStarterVoltage</b>
</dd>
  <dt class="optional">Maximum voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MaximumVoltage</b>
</dd>
  <dt class="optional">History; Min cell-voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MinimumCellVoltage</b>
</dd>
  <dt class="optional">Minimum fused voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MinimumFusedVoltage</b>
</dd>
  <dt class="optional">Minimum starter voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MinimumStarterVoltage</b>
</dd>
  <dt class="optional">Minimum voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/MinimumVoltage</b>
</dd>
  <dt class="optional">Time since last full charge (seconds)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/TimeSinceLastFullCharge</b>
</dd>
  <dt class="optional">Total Ah drawn (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/TotalAhDrawn</b>
</dd>
  <dt class="optional">Min discharge voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Info/BatteryLowVoltage</b>
</dd>
  <dt class="optional">CCL - Charge Current Limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Info/MaxChargeCurrent</b>
</dd>
  <dt class="optional">CVL - Charge Voltage Limit (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Info/MaxChargeVoltage</b>
</dd>
  <dt class="optional">DCL - Discharge Current Limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Info/MaxDischargeCurrent</b>
</dd>
  <dt class="optional">ATC (Allow to Charge)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Io/AllowToCharge</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">ATD (Allow to Discharge)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Io/AllowToDischarge</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">IO; external relay<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Io/ExternalRelay</b>
<ul>
  <li>0 - Inactive</li>
  <li>1 - Active</li>
</ul>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>3 - On</li>
  <li>252 - Standby</li>
</ul>
</dd>
  <dt class="optional">Relay status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">State of charge (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Soc</b>
</dd>
  <dt class="optional">State of health (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Soh</b>
</dd>
  <dt class="optional">State<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Initializing (Wait start)</li>
  <li>1 - Initializing (before boot)</li>
  <li>2 - Initializing (Before boot delay)</li>
  <li>3 - Initializing (Wait boot)</li>
  <li>4 - Initializing</li>
  <li>5 - Initializing (Measure battery voltage)</li>
  <li>6 - Initializing (Calculate battery voltage)</li>
  <li>7 - Initializing (Wait bus voltage)</li>
  <li>8 - Initializing (Wait for lynx shunt)</li>
  <li>9 - Running</li>
  <li>10 - Error</li>
  <li>11 - Unused</li>
  <li>12 - Shutdown</li>
  <li>13 - Slave updating</li>
  <li>14 - Standby</li>
  <li>15 - Going to run</li>
  <li>16 - Pre-charging</li>
  <li>17 - Contactor check</li>
</ul>
</dd>
  <dt class="optional">System; batteries parallel (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/BatteriesParallel</b>
</dd>
  <dt class="optional">System; batteries series (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/BatteriesSeries</b>
</dd>
  <dt class="optional">System; ID of module with highest cell voltage<span class="property-type">string</dt>
  <dd>Dbus path: <b>/System/MaxVoltageCellId</b>
</dd>
  <dt class="optional">Maximum cell temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/MaxCellTemperature</b>
</dd>
  <dt class="optional">System; maximum cell voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/MaxCellVoltage</b>
</dd>
  <dt class="optional">System; ID of module with highest cell temperature<span class="property-type">string</dt>
  <dd>Dbus path: <b>/System/MaxTemperatureCellId</b>
</dd>
  <dt class="optional">System; ID of module with lowest cell voltage<span class="property-type">string</dt>
  <dd>Dbus path: <b>/System/MinVoltageCellId</b>
</dd>
  <dt class="optional">Minimum cell temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/MinCellTemperature</b>
</dd>
  <dt class="optional">System; minimum cell voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/MinCellVoltage</b>
</dd>
  <dt class="optional">System; ID of module with lowest cell temperature<span class="property-type">string</dt>
  <dd>Dbus path: <b>/System/MinTemperatureCellId</b>
</dd>
  <dt class="optional">System; number of batteries (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/NrOfBatteries</b>
</dd>
  <dt class="optional">System; number of cells per battery (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/System/NrOfCellsPerBattery</b>
</dd>
  <dt class="optional">Number of modules blocking charge<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesBlockingCharge</b>
</dd>
  <dt class="optional">Number of modules blocking discharge<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesBlockingDischarge</b>
</dd>
  <dt class="optional">Number of offline modules<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesOffline</b>
</dd>
  <dt class="optional">Number of online modules<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesOnline</b>
</dd>
  <dt class="optional">System-switch<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/SystemSwitch</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
<p>For monitoring the state of the built-in contactor.</p>
</dd>
  <dt class="optional">Time to go (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/TimeToGo</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-dcdc">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node allows for monitoring the state of an Orion XS.</p>
<h3>Dcdc</h3>
<dl class="message-properties">
  <dt class="optional">/Dc/0/Current (A DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">/Dc/0/Temperature (Degrees celsius)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">/Dc/0/Voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">/Dc/In/V (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/In/V</b>
</dd>
  <dt class="optional">/Dc/In/P (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/In/P</b>
</dd>
  <dt class="optional">/ErrorCode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No error</li>
  <li>1 - Battery temperature too high</li>
  <li>2 - Battery voltage too high</li>
  <li>3 - Battery temperature sensor miswired (+)</li>
  <li>4 - Battery temperature sensor miswired (-)</li>
  <li>5 - Battery temperature sensor disconnected</li>
  <li>6 - Battery voltage sense miswired (+)</li>
  <li>7 - Battery voltage sense miswired (-)</li>
  <li>8 - Battery voltage sense disconnected</li>
  <li>9 - Battery voltage wire losses too high</li>
  <li>17 - Charger temperature too high</li>
  <li>18 - Charger over-current</li>
  <li>19 - Charger current polarity reversed</li>
  <li>20 - Bulk time limit reached</li>
  <li>22 - Charger temperature sensor miswired</li>
  <li>23 - Charger temperature sensor disconnected</li>
  <li>34 - Input current too high</li>
</ul>
</dd>
  <dt class="optional">/FirmwareVersion<span class="property-type">float</dt>
  <dd>Dbus path: <b>/FirmwareVersion</b>
</dd>
  <dt class="optional">/History/Cumulative/User/ChargedAh (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Cumulative/User/ChargedAh</b>
</dd>
  <dt class="optional">/ProductId<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ProductId</b>
</dd>
  <dt class="optional">/State<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>2 - Fault</li>
  <li>3 - Bulk</li>
  <li>4 - Absorption</li>
  <li>5 - Float</li>
  <li>6 - Storage</li>
  <li>7 - Equalize</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-dcload">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node allows for monitoring the state of BMVs configured in Monitor Mode and DC meter type is a load.</p>
<h3>Dcload</h3>
<dl class="message-properties">
  <dt class="optional">High starter-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighStarterVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low starter-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowStarterVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Starter battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Total energy consumed (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/EnergyIn</b>
</dd>
  <dt class="optional">Relay status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-dcsource">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node allows for monitoring the state of Battery Monitor Victron devices (BMV's) configured in Monitor Mode and DC meter type is a source.</p>
<h3>Dcsource</h3>
<dl class="message-properties">
  <dt class="optional">High starter-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighStarterVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low starter-voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowStarterVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Starter battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Total energy produced (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/EnergyOut</b>
</dd>
  <dt class="optional">Relay status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-dcsystem">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>DC system input node is a DC measurement for loads in your system.</p>
<h3>Dcsystem</h3>
<dl class="message-properties">
  <dt class="optional">High auxiliary voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighStarterVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low auxiliary voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowStarterVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Auxiliary voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Total energy consumed (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/EnergyIn</b>
</dd>
  <dt class="optional">Total energy produced (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/EnergyOut</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-digitalinput">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>With this node it is possible to read the digital inputs from the Venus device. The node only shows the enabled digital inputs, so first make sure to enable the input from the Venus OS GUI (<i>Settings -> I/O -> digital inputs</i>) for the desired readout.</p><p>Depending on the selected type of input, different measurements become available.</p><p>Also see the section on <a href="https://www.victronenergy.com/media/pg/Cerbo_GX/en/digital-inputs.html">digital inputs</a> in the Cerbo GX manual.</p>
<h3>Pulsemeter</h3>
<dl class="message-properties">
  <dt class="optional">Pulse meter aggregate<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Aggregate</b>
</dd>
  <dt class="optional">Pulse meter count<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Count</b>
</dd>
</dl>
<h3>Digitalinput</h3>
<dl class="message-properties">
  <dt class="optional">Digital input alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarm</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Digital input count<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Count</b>
</dd>
  <dt class="optional">Digital input state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - low</li>
  <li>1 - high</li>
  <li>2 - off</li>
  <li>3 - on</li>
  <li>4 - no</li>
  <li>5 - yes</li>
  <li>6 - open</li>
  <li>7 - closed</li>
  <li>8 - ok</li>
  <li>9 - alarm</li>
  <li>10 - running</li>
  <li>11 - stopped</li>
</ul>
</dd>
  <dt class="optional">Digital input type<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Type</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Pulse meter</li>
  <li>2 - Door sensor</li>
  <li>3 - Bilge pump</li>
  <li>4 - Bilge alarm</li>
  <li>5 - Burglar alarm</li>
  <li>6 - Smoke alarm</li>
  <li>7 - Fire alarm</li>
  <li>8 - CO2 alarm</li>
  <li>9 - Generator</li>
  <li>10 - Generic input</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-ess">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node gives information on the energy storage system (ESS).</p>
<h3>Battery</h3>
<dl class="message-properties">
  <dt class="optional">Maximum battery cell temperature<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/MaxCellTemperature</b>
</dd>
  <dt class="optional">Maximum battery cell voltage<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/MaxCellVoltage</b>
</dd>
  <dt class="optional">Minimum battery cell temperature<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/MinCellTemperature</b>
</dd>
  <dt class="optional">Minimum battery cell voltage<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/MinCellVoltage</b>
</dd>
  <dt class="optional">Number of modules blocking charge<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesBlockingCharge</b>
</dd>
  <dt class="optional">Number of modules blocking discharge<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesBlockingDischarge</b>
</dd>
  <dt class="optional">Number of offline modules<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesOffline</b>
</dd>
  <dt class="optional">Number of online modules<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/System/NrOfModulesOnline</b>
</dd>
</dl>
<h3>Vebus</h3>
<dl class="message-properties">
  <dt class="optional">Disable charge<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableCharge</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Disable feed-in<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableFeedIn</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Feed in overvoltage<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DoNotFeedInOvervoltage</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">AC Power L1 setpoint (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L1/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L1 (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L1/MaxFeedInPower</b>
</dd>
  <dt class="optional">AC Power L2 setpoint (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L2/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L2 (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L2/MaxFeedInPower</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L3 (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L3/MaxFeedInPower</b>
</dd>
  <dt class="optional">AC Power L3 setpoint (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L3/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Disable PV inverter<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/PvInverter/Disable</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">VE.Bus system restart<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/SystemReset</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
</dl>
<h3>Settings</h3>
<dl class="message-properties">
  <dt class="optional">Grid set-point (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/AcPowerSetPoint</b>
</dd>
  <dt class="optional">Minimum Discharge SOC (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/MinimumSocLimit</b>
</dd>
  <dt class="optional">Schedule 1: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 1: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>A negative value means that the schedule has been de-activated.</p>
</dd>
  <dt class="optional">Schedule 1: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Duration</b>
</dd>
  <dt class="optional">Schedule 1: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Soc</b>
</dd>
  <dt class="optional">Schedule 1: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Start</b>
</dd>
  <dt class="optional">Schedule 2: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 2: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>A negative value means that the schedule has been de-activated.</p>
</dd>
  <dt class="optional">Schedule 2: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Duration</b>
</dd>
  <dt class="optional">Schedule 2: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Soc</b>
</dd>
  <dt class="optional">Schedule 2: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Start</b>
</dd>
  <dt class="optional">Schedule 3: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 3: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>A negative value means that the schedule has been de-activated.</p>
</dd>
  <dt class="optional">Schedule 3: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Duration</b>
</dd>
  <dt class="optional">Schedule 3: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Soc</b>
</dd>
  <dt class="optional">Schedule 3: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Start</b>
</dd>
  <dt class="optional">Schedule 4: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 4: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>A negative value means that the schedule has been de-activated.</p>
</dd>
  <dt class="optional">Schedule 4: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Duration</b>
</dd>
  <dt class="optional">Schedule 4: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Soc</b>
</dd>
  <dt class="optional">Schedule 4: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Start</b>
</dd>
  <dt class="optional">Schedule 5: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 5: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
Writing a negative value to the path will de-activate the schedule.
</dd>
  <dt class="optional">Schedule 5: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Duration</b>
</dd>
  <dt class="optional">Schedule 5: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Soc</b>
</dd>
  <dt class="optional">Schedule 5: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Start</b>
</dd>
  <dt class="optional">ESS state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/State</b>
<ul>
  <li>1 - BatteryLife enabled (GUI controlled)</li>
  <li>2 - Optimized Mode /w BatteryLife: self consumption</li>
  <li>3 - Optimized Mode /w BatteryLife: self consumption, SoC exceeds 85%</li>
  <li>4 - Optimized Mode /w BatteryLife: self consumption, SoC at 100%</li>
  <li>5 - Optimized Mode /w BatteryLife: SoC below dynamic SoC limit</li>
  <li>6 - Optimized Mode /w BatteryLife: SoC has been below SoC limit for more than 24 hours. Charging the battery (5A)</li>
  <li>7 - Optimized Mode /w BatteryLife: Inverter/Charger is in sustain mode</li>
  <li>8 - Optimized Mode /w BatteryLife: recharging, SoC dropped by 5% or more below the minimum SoC</li>
  <li>9 - 'Keep batteries charged' mode is enabled</li>
  <li>10 - Optimized mode w/o BatteryLife: self consumption, SoC at or above minimum SoC</li>
  <li>11 - Optimized mode w/o BatteryLife: self consumption, SoC is below minimum SoC</li>
  <li>12 - Optimized mode w/o BatteryLife: recharging, SoC dropped by 5% or more below minimum SoC</li>
</ul>
</dd>
  <dt class="optional">ESS mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/Hub4Mode</b>
<ul>
  <li>1 - Optimized mode or 'keep batteries charged' and phase compensation enabled</li>
  <li>2 - Optimized mode or 'keep batteries charged' and phase compensation disabled</li>
  <li>3 - External control</li>
</ul>
</dd>
  <dt class="optional">Max charge power (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxChargePower</b>
<p>Not used with DVCC.</p>
</dd>
  <dt class="optional">Max inverter power (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxDischargePower</b>
</dd>
  <dt class="optional">Feed excess DC-coupled PV into grid<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/OvervoltageFeedIn</b>
<ul>
  <li>0 - Don’t feed excess DC-tied PV into grid</li>
  <li>1 - Feed excess DC-tied PV into the grid</li>
</ul>
</dd>
  <dt class="optional">Don’t feed excess AC-coupled PV into grid<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/PreventFeedback</b>
<ul>
  <li>0 - Feed excess AC-tied PV into grid</li>
  <li>1 - Don’t feed excess AC-tied PV into the grid</li>
</ul>
</dd>
  <dt class="optional">DVCC Charge current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/MaxChargeCurrent</b>
</dd>
  <dt class="optional">DVCC Maximum charge voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/MaxChargeVoltage</b>
</dd>
</dl>
<h3>System</h3>
<dl class="message-properties">
  <dt class="optional">Active SOC limit (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Control/ActiveSocLimit</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-evcharger">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>The EV charger input node is for reading from the EV Charging Station.</p><p>Also see <a href="https://github.com/victronenergy/venus/wiki/dbus#evcharger">here</a> for more information.</p>
<h3>Evcharger</h3>
<dl class="message-properties">
  <dt class="optional">Energy consumed by charger (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Energy/Forward</b>
</dd>
  <dt class="optional">L1 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Power</b>
</dd>
  <dt class="optional">L2 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Power</b>
</dd>
  <dt class="optional">L3 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Power</b>
</dd>
  <dt class="optional">Total power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Power</b>
</dd>
  <dt class="optional">Charging time (seconds)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ChargingTime</b>
</dd>
  <dt class="optional">Charge current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Current</b>
</dd>
  <dt class="optional">Display<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/EnableDisplay</b>
<ul>
  <li>0 - Locked</li>
  <li>1 - Unlocked</li>
</ul>
</dd>
  <dt class="optional">Firmware version<span class="property-type">float</dt>
  <dd>Dbus path: <b>/FirmwareVersion</b>
</dd>
  <dt class="optional">Maximum charge current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/MaxCurrent</b>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>0 - Manual</li>
  <li>1 - Auto</li>
  <li>2 - Schedule</li>
</ul>
</dd>
  <dt class="optional">Model<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Model</b>
</dd>
  <dt class="optional">Product ID<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ProductId</b>
</dd>
  <dt class="optional">Serial<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Serial</b>
</dd>
  <dt class="optional">Set charge current (manual mode) (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/SetCurrent</b>
</dd>
  <dt class="optional">Start/stop charging (manual mode)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/StartStop</b>
<ul>
  <li>0 - Stop</li>
  <li>1 - Start</li>
</ul>
</dd>
  <dt class="optional">Status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Status</b>
<ul>
  <li>0 - Disconnected</li>
  <li>1 - Connected</li>
  <li>2 - Charging</li>
  <li>3 - Charged</li>
  <li>4 - Waiting for sun</li>
  <li>5 - Waiting for RFID</li>
  <li>6 - Waiting for start</li>
  <li>7 - Low SOC</li>
  <li>8 - Ground fault</li>
  <li>9 - Welded contacts</li>
  <li>10 - CP Input shorted</li>
  <li>11 - Residual current detected</li>
  <li>12 - Under voltage detected</li>
  <li>13 - Overvoltage detected</li>
  <li>14 - Overheating detected</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-fuelcell">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>See <a href="https://github.com/victronenergy/venus/wiki/dbus#fuelcell">https://github.com/victronenergy/venus/wiki/dbus#fuelcell</a> for more information.</p>
<h3>Fuelcell</h3>
<dl class="message-properties">
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High auxiliary voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighStarterVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low auxiliary voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowStarterVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Auxiliary voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/1/Voltage</b>
</dd>
  <dt class="optional">Total energy produced (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/EnergyOut</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-generator">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>Generator input node for relay controlled and Fischer Panda generators.<br />In order to use the relay for controlling a generator, make sure to set the relay to <i>Generator</i> via the (remote) console first.<br />Also see <a href="https://github.com/victronenergy/venus/wiki/dbus#generator-data">here</a> for more information.</p>
<h3>Generator</h3>
<dl class="message-properties">
  <dt class="optional">Generator not detected at AC input alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/NoGeneratorAtAcIn</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Auto start enabled/disabled<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/AutoStartEnabled</b>
<ul>
  <li>0 - Autostart disabled</li>
  <li>1 - Autostart enabled</li>
</ul>
</dd>
  <dt class="optional">Generator remote error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Error</b>
<ul>
  <li>0 - No Error</li>
  <li>1 - Remote disabled</li>
  <li>2 - Remote fault</li>
</ul>
</dd>
  <dt class="optional">Manual Start<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ManualStart</b>
<ul>
  <li>0 - Stop generator</li>
  <li>1 - Start generator</li>
</ul>
</dd>
  <dt class="optional">Quiet hours active<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/QuietHours</b>
<ul>
  <li>0 - Quiet hours inactive</li>
  <li>1 - Quiet hours active</li>
</ul>
</dd>
  <dt class="optional">Condition that started the generator<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/RunningByConditionCode</b>
<ul>
  <li>0 - Stopped</li>
  <li>1 - Manual</li>
  <li>2 - TestRun</li>
  <li>3 - LossOfComms</li>
  <li>4 - Soc</li>
  <li>5 - AcLoad</li>
  <li>6 - BatteryCurrent</li>
  <li>7 - BatteryVoltage</li>
  <li>8 - InverterTemperatur</li>
  <li>9 - InverterOverload</li>
  <li>10 - StopOnAc1</li>
</ul>
</dd>
  <dt class="optional">Runtime in seconds (seconds)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Runtime</b>
</dd>
  <dt class="optional">Service countdown counter (seconds until next generator service)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ServiceCounter</b>
</dd>
  <dt class="optional">Generator start/stop state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Stopped</li>
  <li>1 - Running</li>
  <li>10 - Error</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-genset">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node is essentially an energy meter showing volts, amps, power, energy etc. It is comparable with the input-gridmeter.</p>
<h3>Genset</h3>
<dl class="message-properties">
  <dt class="optional">Phase 1 current (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Current</b>
</dd>
  <dt class="optional">Phase 1 frequency (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Frequency</b>
</dd>
  <dt class="optional">Phase 1 power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Power</b>
</dd>
  <dt class="optional">Phase 1 voltage (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Voltage</b>
</dd>
  <dt class="optional">Phase 2 current (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Current</b>
</dd>
  <dt class="optional">Phase 2 frequency (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Frequency</b>
</dd>
  <dt class="optional">Phase 2 power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Power</b>
</dd>
  <dt class="optional">Phase 2 voltage (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Voltage</b>
</dd>
  <dt class="optional">Phase 3 current (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Current</b>
</dd>
  <dt class="optional">Phase 3 frequency (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Frequency</b>
</dd>
  <dt class="optional">Phase 3 power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Power</b>
</dd>
  <dt class="optional">Phase 3 voltage (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Voltage</b>
</dd>
  <dt class="optional">Auto start<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/AutoStart</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">DC output 1 - Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">DC output 1 - Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Power</b>
</dd>
  <dt class="optional">DC output 1 - Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Engine coolant temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/CoolantTemperature</b>
</dd>
  <dt class="optional">Engine exhaust temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/ExaustTemperature</b>
</dd>
  <dt class="optional">Engine load (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/Load</b>
</dd>
  <dt class="optional">Oil pressure (kPa)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/OilPressure</b>
</dd>
  <dt class="optional">Engine operating hours (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/OperatingHours</b>
</dd>
  <dt class="optional">Engine speed (RPM)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/Speed</b>
</dd>
  <dt class="optional">Engine winding temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Engine/WindingTemperature</b>
</dd>
  <dt class="optional">Error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No error</li>
  <li>1 - AC voltage L1 too low</li>
  <li>2 - AC frequency L1 too low</li>
  <li>3 - AC current too low</li>
  <li>4 - AC power too low</li>
  <li>5 - Emergency stop</li>
  <li>6 - Servo current too low</li>
  <li>7 - Oil pressure too low</li>
  <li>8 - Engine temperature too low</li>
  <li>9 - Winding temperature too low</li>
  <li>10 - Exhaust temperature too low</li>
  <li>13 - Starter current too low</li>
  <li>14 - Glow current too low</li>
  <li>15 - Glow current too low</li>
  <li>16 - Fuel holding magnet current too low</li>
  <li>17 - Stop solenoid hold coil current too low</li>
  <li>18 - Stop solenoid pull coil current too low</li>
  <li>19 - Optional DC out current too low</li>
  <li>20 - 5V output voltage too low</li>
  <li>21 - Boost output current too low</li>
  <li>22 - Panel supply current too high</li>
  <li>25 - Starter battery voltage too low</li>
  <li>26 - Startup aborted (rotation too low)</li>
  <li>28 - Rotation too low</li>
  <li>29 - Power contactor current too low</li>
  <li>30 - AC voltage L2 too low</li>
  <li>31 - AC frequency L2 too low</li>
  <li>32 - AC current L2 too low</li>
  <li>33 - AC power L2 too low</li>
  <li>34 - AC voltage L3 too low</li>
  <li>35 - AC frequency L3 too low</li>
  <li>36 - AC current L3 too low</li>
  <li>37 - AC power L3 too low</li>
  <li>62 - Fuel temperature too low</li>
  <li>63 - Fuel level too low</li>
  <li>65 - AC voltage L1 too high</li>
  <li>66 - AC frequency too high</li>
  <li>67 - AC current too high</li>
  <li>68 - AC power too high</li>
  <li>70 - Servo current too high</li>
  <li>71 - Oil pressure too high</li>
  <li>72 - Engine temperature too high</li>
  <li>73 - Winding temperature too high</li>
  <li>74 - Exhaust temperature too low</li>
  <li>77 - Starter current too low</li>
  <li>78 - Glow current too high</li>
  <li>79 - Glow current too high</li>
  <li>80 - Fuel holding magnet current too high</li>
  <li>81 - Stop solenoid hold coil current too high</li>
  <li>82 - Stop solenoid pull coil current too high</li>
  <li>83 - Optional DC out current too high</li>
  <li>84 - 5V output voltage too high</li>
  <li>85 - Boost output current too high</li>
  <li>89 - Starter battery voltage too high</li>
  <li>90 - Startup aborted (rotation too high)</li>
  <li>92 - Rotation too high</li>
  <li>93 - Power contactor current too high</li>
  <li>94 - AC voltage L2 too high</li>
  <li>95 - AC frequency L2 too high</li>
  <li>96 - AC current L2 too high</li>
  <li>97 - AC power L2 too high</li>
  <li>98 - AC voltage L3 too high</li>
  <li>99 - AC frequency L3 too high</li>
  <li>100 - AC current L3 too high</li>
  <li>101 - AC power L3 too high</li>
  <li>126 - Fuel temperature too high</li>
  <li>127 - Fuel level too high</li>
  <li>130 - Lost control unit</li>
  <li>131 - Lost panel</li>
  <li>132 - Service needed</li>
  <li>133 - Lost 3-phase module</li>
  <li>134 - Lost AGT module</li>
  <li>135 - Synchronization failure</li>
  <li>137 - Intake airfilter</li>
  <li>139 - Lost sync. module</li>
  <li>140 - Load-balance failed</li>
  <li>141 - Sync-mode deactivated</li>
  <li>142 - Engine controller</li>
  <li>148 - Rotating field wrong</li>
  <li>149 - Fuel level sensor lost</li>
  <li>150 - Init failed</li>
  <li>151 - Watchdog</li>
  <li>152 - Out: winding</li>
  <li>153 - Out: exhaust</li>
  <li>154 - Out: Cyl. head</li>
  <li>155 - Inverter over temperature</li>
  <li>156 - Inverter overload</li>
  <li>157 - Inverter communication lost</li>
  <li>158 - Inverter sync failed</li>
  <li>159 - CAN communication lost</li>
  <li>160 - L1 overload</li>
  <li>161 - L2 overload</li>
  <li>162 - L3 overload</li>
  <li>163 - DC overload</li>
  <li>164 - DC overvoltage</li>
  <li>165 - Emergency stop</li>
  <li>166 - No connection</li>
</ul>
</dd>
  <dt class="optional">Heatsink temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/HeatsinkTemperature</b>
</dd>
  <dt class="optional">Generator model<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ProductId</b>
</dd>
  <dt class="optional">Starter voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/StarterVoltage</b>
</dd>
  <dt class="optional">Status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/StatusCode</b>
<ul>
  <li>0 - Standby</li>
  <li>1 - Startup 1</li>
  <li>2 - Startup 2</li>
  <li>3 - Startup 3</li>
  <li>4 - Startup 4</li>
  <li>5 - Startup 5</li>
  <li>6 - Startup 6</li>
  <li>7 - Startup 7</li>
  <li>8 - Running</li>
  <li>9 - Stopping</li>
  <li>10 - Error</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-gps">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>GPS information can be obtained with this node. For an example usage see the <a href="https://github.com/victronenergy/node-red-contrib-victron/wiki/Example-Flows#location-based-scheduling">location based scheduling</a> example.</p>
<h3>Gps</h3>
<dl class="message-properties">
  <dt class="optional">Altitude (m)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Altitude</b>
</dd>
  <dt class="optional">Course (Deg)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Course</b>
</dd>
  <dt class="optional">Fix<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Fix</b>
</dd>
  <dt class="optional">Number of satellites<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/NrOfSatellites</b>
</dd>
  <dt class="optional">Latitude (LAT)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Position/Latitude</b>
</dd>
  <dt class="optional">Longitude (LNG)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Position/Longitude</b>
</dd>
  <dt class="optional">Speed (m/s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Speed</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-gridmeter">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node gives allows for monitoring the grid. See also <a href="https://www.victronenergy.com/accessories/energy-meter">energy meters</a> accessories.</p>
<h3>Grid</h3>
<dl class="message-properties">
  <dt class="optional">Frequency (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Frequency</b>
</dd>
  <dt class="optional">Total Forward Energy (bought) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Energy/Forward</b>
</dd>
  <dt class="optional">Total Reverse Energy (sold) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Energy/Reverse</b>
</dd>
  <dt class="optional">L1 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Current</b>
</dd>
  <dt class="optional">L1 Forward energy (bought) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Energy/Forward</b>
</dd>
  <dt class="optional">L1 Reverse energy (sold) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Energy/Reverse</b>
</dd>
  <dt class="optional">L1 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Power</b>
</dd>
  <dt class="optional">L1 Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Voltage</b>
</dd>
  <dt class="optional">L2 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Current</b>
</dd>
  <dt class="optional">L2 Forward energy (bought) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Energy/Forward</b>
</dd>
  <dt class="optional">L2 Reverse energy (sold) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Energy/Reverse</b>
</dd>
  <dt class="optional">L2 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Power</b>
</dd>
  <dt class="optional">L2 Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Voltage</b>
</dd>
  <dt class="optional">L3 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Current</b>
</dd>
  <dt class="optional">L3 Forward energy (bought) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Energy/Forward</b>
</dd>
  <dt class="optional">L3 Reverse energy (sold) (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Energy/Reverse</b>
</dd>
  <dt class="optional">L3 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Power</b>
</dd>
  <dt class="optional">L3 Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Voltage</b>
</dd>
  <dt class="optional">Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Power</b>
</dd>
  <dt class="optional">Serial<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Serial</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-inverter">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node is for reading from an inverter.</p>
<h3>Inverter</h3>
<dl class="message-properties">
  <dt class="optional">Output current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/I</b>
</dd>
  <dt class="optional">Output power (W AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/P</b>
</dd>
  <dt class="optional">Output voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/V</b>
</dd>
  <dt class="optional">High temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High battery voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High AC-Out voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltageAcOut</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low SOC alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowSoc</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low AC-Out voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltageAcOut</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Overload alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Overload</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Ripple alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Ripple</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Input voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Energy from battery to AC-out (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcOut</b>
</dd>
  <dt class="optional">Energy from AC-out to battery (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/OutToInverter</b>
</dd>
  <dt class="optional">Energy from solar to AC-out (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/SolarToAcOut</b>
</dd>
  <dt class="optional">Energy from solar to battery (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/SolarToBattery</b>
</dd>
  <dt class="optional">Firmware version<span class="property-type">float</dt>
  <dd>Dbus path: <b>/FirmwareVersion</b>
</dd>
  <dt class="optional">Maximum power for today on tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/0/MaxPower</b>
</dd>
  <dt class="optional">Yield today for today on tracker 0 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/0/Yield</b>
</dd>
  <dt class="optional">Maximum power for today on tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/1/MaxPower</b>
</dd>
  <dt class="optional">Yield today for today on tracker 1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/1/Yield</b>
</dd>
  <dt class="optional">Maximum power for today on tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/2/MaxPower</b>
</dd>
  <dt class="optional">Yield today for today on tracker 2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/2/Yield</b>
</dd>
  <dt class="optional">Maximum power for today on tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/3/MaxPower</b>
</dd>
  <dt class="optional">Yield today for today on tracker 3 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/3/Yield</b>
</dd>
  <dt class="optional">Maximum power for yesterday on tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/0/MaxPower</b>
</dd>
  <dt class="optional">Yield today for yesterday on tracker 0 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/0/Yield</b>
</dd>
  <dt class="optional">Maximum power for yesterday on tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/1/MaxPower</b>
</dd>
  <dt class="optional">Yield today for yesterday on tracker 1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/1/Yield</b>
</dd>
  <dt class="optional">Maximum power for yesterday on tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/2/MaxPower</b>
</dd>
  <dt class="optional">Yield today for yesterday on tracker 2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/2/Yield</b>
</dd>
  <dt class="optional">Maximum power for yesterday on tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/3/MaxPower</b>
</dd>
  <dt class="optional">Yield today for yesterday on tracker 3 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/3/Yield</b>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>2 - Inverter on</li>
  <li>4 - Off</li>
  <li>5 - Low Power/ECO</li>
</ul>
</dd>
  <dt class="optional">Inverter model<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ProductId</b>
</dd>
  <dt class="optional">MPP operation mode tracker 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/0/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/0/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 0 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/0/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/1/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/1/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 1 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/1/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/2/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/2/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 2 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/2/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 4<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/3/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/3/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 3 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/3/V</b>
</dd>
  <dt class="optional">PV voltage (for single tracker units) (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/V</b>
</dd>
  <dt class="optional">Relay state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">State<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Low Power</li>
  <li>2 - Fault</li>
  <li>9 - Inverting</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-meteo">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>The <b>input-meteo</b> node allows for Solar Irradiance, Temperature and Wind Speed Sensors measuring.</p><p>More information and supported devices can be found in the <a href="https://www.victronenergy.com/media/pg/Cerbo_GX/en/installation.html#UUID-d4b7dfe9-4ee0-53bc-8959-c567ed63cebb">manual</a>.</p>
<h3>Meteo</h3>
<dl class="message-properties">
  <dt class="optional">Sensor cell temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/CellTemperature</b>
</dd>
  <dt class="optional">External temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ExternalTemperature</b>
</dd>
  <dt class="optional">External temperature – second sensor (Degrees celsius)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ExternalTemperature2</b>
</dd>
  <dt class="optional">Solar Irradiance (W/m^2)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Irradiance</b>
</dd>
  <dt class="optional">Wind speed (m/s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/WindSpeed</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-motordrive">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This is the motordrive input node. See <a href="https://bitbucket.org/oceanvolt/dbus_motordrive/src">https://bitbucket.org/oceanvolt/dbus_motordrive/src</a> for more information.</p>
<h3>Motordrive</h3>
<dl class="message-properties">
  <dt class="optional">Controller Temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Controller/Temperature</b>
</dd>
  <dt class="optional">Motor RPM (RPM)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Motor/RPM</b>
</dd>
  <dt class="optional">Motor temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Motor/Temperature</b>
</dd>
  <dt class="optional">Controller DC Current (A DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Controller DC Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Power</b>
</dd>
  <dt class="optional">Controller DC Voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-multi">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This is the Multi RS input node.</p>
<h3>Multi</h3>
<dl class="message-properties">
  <dt class="optional">Active AC input<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/ActiveInput</b>
<ul>
  <li>0 - AC Input 1</li>
  <li>1 - AC Input 2</li>
  <li>240 - Disconnected</li>
</ul>
</dd>
  <dt class="optional">Ac input 1 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/CurrentLimit</b>
</dd>
  <dt class="optional">Input frequency phase 1 (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L1/F</b>
</dd>
  <dt class="optional">Input current phase 1 (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L1/I</b>
</dd>
  <dt class="optional">Input power phase 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L1/P</b>
</dd>
  <dt class="optional">Input voltage phase 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L1/V</b>
</dd>
  <dt class="optional">Input current phase 2 (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L2/I</b>
</dd>
  <dt class="optional">Input power phase 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L2/P</b>
</dd>
  <dt class="optional">Input voltage phase 2 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L2/V</b>
</dd>
  <dt class="optional">Input current phase 3 (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L3/I</b>
</dd>
  <dt class="optional">Input power phase 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L3/P</b>
</dd>
  <dt class="optional">Input voltage phase 3 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/L3/V</b>
</dd>
  <dt class="optional">AC input 1 source type<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/In/1/Type</b>
<ul>
  <li>0 - Unused</li>
  <li>1 - Grid</li>
  <li>2 - Genset</li>
  <li>3 - Shore</li>
</ul>
</dd>
  <dt class="optional">Ac input 2 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/2/CurrentLimit</b>
</dd>
  <dt class="optional">AC input 2 source type<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/In/2/Type</b>
<ul>
  <li>0 - Unused</li>
  <li>1 - Grid</li>
  <li>2 - Genset</li>
  <li>3 - Shore</li>
</ul>
</dd>
  <dt class="optional">Phase count (count)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/NumberOfPhases</b>
</dd>
  <dt class="optional">Output frequency phase 1 (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/F</b>
</dd>
  <dt class="optional">Output current phase 1 (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/I</b>
</dd>
  <dt class="optional">Output power phase 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/P</b>
</dd>
  <dt class="optional">Output voltage phase 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/V</b>
</dd>
  <dt class="optional">Output current phase 2 (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L2/I</b>
</dd>
  <dt class="optional">Output power phase 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L2/P</b>
</dd>
  <dt class="optional">Output voltage phase 2 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L2/V</b>
</dd>
  <dt class="optional">Output current phase 3 (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L3/I</b>
</dd>
  <dt class="optional">Output power phase 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L3/P</b>
</dd>
  <dt class="optional">Output voltage phase 3 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L3/V</b>
</dd>
  <dt class="optional">Temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High AC-Out voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltageAcOut</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low SOC alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowSoc</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery temperature alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low AC-Out voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltageAcOut</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Overload alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Overload</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High DC ripple alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Ripple</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Energy from AC-in-1 to AC-out (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn1ToAcOut</b>
</dd>
  <dt class="optional">Energy from AC-in-1 to battery (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn1ToInverter</b>
</dd>
  <dt class="optional">Energy from AC-in-2 to AC-out (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn2ToAcOut</b>
</dd>
  <dt class="optional">Energy from AC-in-2 to battery (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn2ToInverter</b>
</dd>
  <dt class="optional">Energy from AC-out to AC-in-1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcOutToAcIn1</b>
</dd>
  <dt class="optional">Energy from AC-out to AC-in-2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcOutToAcIn2</b>
</dd>
  <dt class="optional">Energy from battery to AC-in-1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcIn1</b>
</dd>
  <dt class="optional">Energy from battery to AC-in-2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcIn2</b>
</dd>
  <dt class="optional">Energy from battery to AC-out (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcOut</b>
</dd>
  <dt class="optional">Energy from AC-out to battery (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/OutToInverter</b>
</dd>
  <dt class="optional">Energy from solar to AC-in-1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/SolarToAcIn1</b>
</dd>
  <dt class="optional">Energy from solar to AC-in-2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/SolarToAcIn2</b>
</dd>
  <dt class="optional">Energy from solar to AC-out (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/SolarToAcOut</b>
</dd>
  <dt class="optional">Energy from solar to battery (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/SolarToBattery</b>
</dd>
  <dt class="optional">Error code<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No error</li>
  <li>1 - Battery temperature too high</li>
  <li>2 - Battery voltage too high</li>
  <li>3 - Battery temperature sensor miswired (+)</li>
  <li>4 - Battery temperature sensor miswired (-)</li>
  <li>5 - Battery temperature sensor disconnected</li>
  <li>6 - Battery voltage sense miswired (+)</li>
  <li>7 - Battery voltage sense miswired (-)</li>
  <li>8 - Battery voltage sense disconnected</li>
  <li>9 - Battery voltage wire losses too high</li>
  <li>17 - Charger temperature too high</li>
  <li>18 - Charger over-current</li>
  <li>19 - Charger current polarity reversed</li>
  <li>20 - Bulk time limit reached</li>
  <li>22 - Charger temperature sensor miswired</li>
  <li>23 - Charger temperature sensor disconnected</li>
  <li>34 - Input current too high</li>
</ul>
</dd>
  <dt class="optional">Maximum charge power today (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/MaxPower</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/0/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 0 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/0/Yield</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/1/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/1/Yield</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/2/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/2/Yield</b>
</dd>
  <dt class="optional">Yield today for tracker 3 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/3/Yield</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/3/MaxPower</b>
</dd>
  <dt class="optional">Yield today (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/MaxPower</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/0/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 0 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/0/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/1/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/1/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/2/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/2/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/3/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 3 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/3/Yield</b>
</dd>
  <dt class="optional">Yield yesterday (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Yield</b>
</dd>
  <dt class="optional">MPP operation mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">MPP operation mode tracker 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/0/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/0/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 0 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/0/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/1/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/1/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 1 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/1/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/2/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/2/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 2 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/2/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 4<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/3/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">PV power for tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/3/P</b>
</dd>
  <dt class="optional">PV voltage for tracker 3 (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/3/V</b>
</dd>
  <dt class="optional">PV voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/V</b>
</dd>
  <dt class="optional">Relay on the Multi RS<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Battery State of Charge (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Soc</b>
</dd>
  <dt class="optional">Inverter/Charger state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Low Power</li>
  <li>2 - Fault</li>
  <li>3 - Bulk</li>
  <li>4 - Absorption</li>
  <li>5 - Float</li>
  <li>6 - Storage</li>
  <li>7 - Equalize</li>
  <li>8 - Passthru</li>
  <li>9 - Inverting</li>
  <li>10 - Power assist</li>
  <li>11 - Power supply</li>
  <li>252 - External control</li>
</ul>
</dd>
  <dt class="optional">Switch position<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - Charger Only</li>
  <li>2 - Inverter Only</li>
  <li>3 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
  <dt class="optional">PV power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Yield/Power</b>
</dd>
  <dt class="optional">User yield (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Yield/User</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-pulsemeter">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node is for obtaining information from a pulsemeter. In order to use this, set a digital input to <strong>Pulse meter</strong> first via the GUI (Under <i>I/O -> Digital inputs</i>).</p>
<h3>Pulsemeter</h3>
<dl class="message-properties">
  <dt class="optional">Count (number of pulses on meter)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Count</b>
</dd>
  <dt class="optional">Aggregate (measured value) (m3)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Aggregate</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-pump">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>Node for getting pump information.</p>
<h3>Pump</h3>
<dl class="message-properties">
  <dt class="optional">Pump State<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Stopped</li>
  <li>1 - Running</li>
</ul>
</dd>
</dl>
<h3>Settings</h3>
<dl class="message-properties">
  <dt class="optional">Auto start enabled<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/Pump0/AutoStartEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/Pump0/Mode</b>
<ul>
  <li>0 - Auto</li>
  <li>1 - On</li>
  <li>2 - Off</li>
</ul>
</dd>
  <dt class="optional">Start value (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/Pump0/StartValue</b>
</dd>
  <dt class="optional">Stop value (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/Pump0/StopValue</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-pvinverter">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This node is for obtaining information from the PV inverter.</p>
<h3>Pvinverter</h3>
<dl class="message-properties">
  <dt class="optional">Total energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Energy/Forward</b>
</dd>
  <dt class="optional">L1 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Current</b>
</dd>
  <dt class="optional">L1 Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Energy/Forward</b>
</dd>
  <dt class="optional">L1 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Power</b>
</dd>
  <dt class="optional">Power limit (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PowerLimit</b>
</dd>
  <dt class="optional">L1 Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L1/Voltage</b>
</dd>
  <dt class="optional">L2 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Current</b>
</dd>
  <dt class="optional">L2 Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Energy/Forward</b>
</dd>
  <dt class="optional">L2 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Power</b>
</dd>
  <dt class="optional">L2 Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L2/Voltage</b>
</dd>
  <dt class="optional">L3 Current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Current</b>
</dd>
  <dt class="optional">L3 Energy (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Energy/Forward</b>
</dd>
  <dt class="optional">L3 Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Power</b>
</dd>
  <dt class="optional">L3 Voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/L3/Voltage</b>
</dd>
  <dt class="optional">Maximum Power Capacity (kW)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/MaxPower</b>
</dd>
  <dt class="optional">Total Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Power</b>
</dd>
  <dt class="optional">Error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No Error</li>
</ul>
</dd>
  <dt class="optional">Position<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Position</b>
<ul>
  <li>0 - AC input 1</li>
  <li>1 - AC output</li>
  <li>2 - AC input 2</li>
</ul>
</dd>
  <dt class="optional">Serial<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Serial</b>
</dd>
  <dt class="optional">Status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/StatusCode</b>
<ul>
  <li>0 - Startup 0</li>
  <li>1 - Startup 1</li>
  <li>2 - Startup 2</li>
  <li>3 - Startup 3</li>
  <li>4 - Startup 4</li>
  <li>5 - Startup 5</li>
  <li>6 - Startup 6</li>
  <li>7 - Running</li>
  <li>8 - Standby</li>
  <li>9 - Boot loading</li>
  <li>10 - Error</li>
  <li>11 - Running (MPPT)</li>
  <li>12 - Running (Throttled)</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-relay">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>The <b>input-relay</b> node reads the state of the relay(s) of the Venus device.</p>
<h3>System</h3>
<dl class="message-properties">
  <dt class="optional">Venus relay 1 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Venus relay 2 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/1/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Venus relay 3 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/2/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Venus relay 4 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/3/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Accharger</h3>
<dl class="message-properties">
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Battery</h3>
<dl class="message-properties">
  <dt class="optional">Relay status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Charger</h3>
<dl class="message-properties">
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Inverter</h3>
<dl class="message-properties">
  <dt class="optional">Relay state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Multi</h3>
<dl class="message-properties">
  <dt class="optional">Relay on the Multi RS<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Solarcharger</h3>
<dl class="message-properties">
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-settings">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>With this node several settings can be read. Currently the focus is mainly on the Carlo Gavazzi Wired AC Sensors (cgwacs).</p>
<h3>Settings</h3>
<dl class="message-properties">
  <dt class="optional">ESS max charge current (fractional) (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxChargePercentage</b>
</dd>
  <dt class="optional">ESS max discharge current (fractional) (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxDischargePercentage</b>
</dd>
  <dt class="optional">Maximum System Grid Feed In (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxFeedInPower</b>
<ul><li>-1: No limit</li><li> &gt;=0: limited system feed-in</li></ul><p>Applies to DC-coupled and AC-coupled feed-in.</p>
</dd>
  <dt class="optional">ESS BatteryLife SoC limit (read only) (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/SocLimit</b>
</dd>
  <dt class="optional">Enable status LEDs<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/LEDs/Enable</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">AC input 1 source (for VE.Bus inverter/chargers)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/AcInput1</b>
<ul>
  <li>0 - Unused</li>
  <li>1 - Grid</li>
  <li>2 - Genset</li>
  <li>3 - Shore</li>
</ul>
</dd>
  <dt class="optional">AC input 2 source (for VE.Bus inverter/chargers)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/AcInput2</b>
<ul>
  <li>0 - Unused</li>
  <li>1 - Grid</li>
  <li>2 - Genset</li>
  <li>3 - Shore</li>
</ul>
</dd>
  <dt class="optional">System name<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/SystemName</b>
</dd>
</dl>
<h3>Hub4</h3>
<dl class="message-properties">
  <dt class="optional">Grid limiting status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/PvPowerLimiterActive</b>
<ul>
  <li>0 - Feed-in limiting is inactive</li>
  <li>1 - Feed-in limiting is active</li>
</ul>
<p>Applies to both AC-coupled and DC-coupled limiting.</p>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-solarcharger">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>Information from the Solar charger can be read with this node.</p>
<h3>Solarcharger</h3>
<dl class="message-properties">
  <dt class="optional">Alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Alarm</b>
<ul>
  <li>0 - No alarm</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">High batt. voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low batt. voltage alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowVoltage</b>
<ul>
  <li>0 - No alarm</li>
  <li>1 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Equalization pending<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Equalization/Pending</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
  <li>2 - Error</li>
  <li>3 - Unavailable- Unknown</li>
</ul>
</dd>
  <dt class="optional">Equalization time remaining (seconds)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Equalization/TimeRemaining</b>
</dd>
  <dt class="optional">Error code<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ErrorCode</b>
<ul>
  <li>0 - No error</li>
  <li>1 - #1 - Battery temperature too high</li>
  <li>2 - #2 - Battery voltage too high</li>
  <li>3 - #3 - Battery temperature sensor miswired (+)</li>
  <li>4 - #4 - Battery temperature sensor miswired (-)</li>
  <li>5 - #5 - Battery temperature sensor disconnected</li>
  <li>6 - #6 - Battery voltage sense miswired (+)</li>
  <li>7 - #7 - Battery voltage sense miswired (-)</li>
  <li>8 - #8 - Battery voltage sense disconnected</li>
  <li>9 - #9 - Battery voltage wire losses too high</li>
  <li>10 - #10 - Battery voltage too low</li>
  <li>11 - #11 - Battery ripple voltage on terminals too high</li>
  <li>12 - #12 - Battery low state of charge</li>
  <li>13 - #13 - Battery mid-point voltage issue</li>
  <li>14 - #14 - Battery temperature too low</li>
  <li>17 - #17 - Charger temperature too high</li>
  <li>18 - #18 - Charger over-current</li>
  <li>19 - #19 - Charger current polarity reversed</li>
  <li>20 - #20 - Max Bulk-time exceeded</li>
  <li>21 - #21 - Charger current sensor issue</li>
  <li>22 - #22 - Temperature sensor miswired</li>
  <li>23 - #23 - Charger temperature sensor disconnected</li>
  <li>24 - #24 - Charger internal fan not detected</li>
  <li>25 - #25 - Charger internal fan over-current</li>
  <li>26 - #26 - Charger terminal overheated</li>
  <li>27 - #27 - Charger short circuit</li>
  <li>28 - #28 - Charger issue with power stage</li>
  <li>29 - #29 - Over-charge protection</li>
  <li>31 - #31 - Input voltage out of range</li>
  <li>32 - #32 - Input voltage too low</li>
  <li>33 - #33 - Input voltage too high</li>
  <li>34 - #34 - PV over current</li>
  <li>35 - #35 - Input excessive power</li>
  <li>36 - #36 - Input polarity issue</li>
  <li>37 - #37 - Input voltage absent (mains removed, fuse blown?)</li>
  <li>38 - #38 - Input shutdown due to battery over-voltage</li>
  <li>39 - #39 - Input shutdown due to battery over-voltage</li>
  <li>40 - #40 - Internal failure (PV Input failed to shutdown)</li>
  <li>41 - #41 - Inverter shutdown (panel isolation resistance too low)</li>
  <li>42 - #42 - Inverter shutdown (ground current too high: >30mA)</li>
  <li>43 - #43 - Inverter shutdown (voltage over ground relay too high)</li>
  <li>50 - #50 - Inverter overload (iit protection)</li>
  <li>51 - #51 - Inverter temperature too high</li>
  <li>52 - #52 - Inverter excessive current</li>
  <li>53 - #53 - Inverter dc level (internal dc rail voltage)</li>
  <li>54 - #54 - Inverter ac level (output voltage not ok)</li>
  <li>55 - #55 - Inverter dc fail (dc on output)</li>
  <li>56 - #56 - Inverter ac fail (shape wrong)*/</li>
  <li>57 - #57 - Inverter ac on output (inverter only)</li>
  <li>58 - #58 - Inverter bridge fault (hardware signal)</li>
  <li>59 - #59 - ACIN1 relay test fault</li>
  <li>60 - #60 - ACIN2 relay test fault</li>
  <li>65 - #65 - Device disappeared during parallel operation (broken cable?)</li>
  <li>66 - #66 - Incompatible device encountered for parallel operation (e.g. old firmware/different settings)</li>
  <li>67 - #67 - No BMS</li>
  <li>68 - #68 - Network misconfigured</li>
  <li>113 - #113 - Non-volatile storage write error</li>
  <li>114 - #114 - CPU temperature to high</li>
  <li>115 - #115 - CAN/SCI communication lost (when critical)</li>
  <li>116 - #116 - Calibration data lost</li>
  <li>117 - #117 - Incompatible firmware encountered</li>
  <li>118 - #118 - Incompatible hardware encountered</li>
  <li>119 - #119 - Settings data lost</li>
  <li>120 - #120 - Reference voltage failure</li>
  <li>121 - #121 - Tester fail</li>
  <li>122 - #122 - Non-volatile history data invalid/corrupted</li>
  <li>200 - #200 - Internal error</li>
  <li>201 - #201 - Internal error</li>
  <li>203 - #203 - Internal error</li>
  <li>205 - #205 - Internal error</li>
  <li>212 - #212 - Internal error</li>
  <li>215 - #215 - Internal error</li>
</ul>
</dd>
  <dt class="optional">Maximum charge power today (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/MaxPower</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/0/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 0 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/0/Yield</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/1/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/1/Yield</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/2/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/2/Yield</b>
</dd>
  <dt class="optional">Maximum charge power today for tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/3/MaxPower</b>
</dd>
  <dt class="optional">Yield today for tracker 3 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Pv/3/Yield</b>
</dd>
  <dt class="optional">Yield today (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/0/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/MaxPower</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 0 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/0/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 0 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/0/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/1/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/1/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/2/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/2/Yield</b>
</dd>
  <dt class="optional">Maximum charge power yesterday tracker 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/3/MaxPower</b>
</dd>
  <dt class="optional">Yield yesterday for tracker 3 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Pv/3/Yield</b>
</dd>
  <dt class="optional">Yield yesterday (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/History/Daily/1/Yield</b>
</dd>
  <dt class="optional">Load state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Load/State</b>
<ul>
  <li>0 - Off</li>
  <li>1 - On</li>
</ul>
</dd>
  <dt class="optional">Charger on/off<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
  <dt class="optional">MPP operation mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage or current limited</li>
  <li>2 - MPPT Tracker active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">MPP operation mode tracker 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/0/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">Tracker 1 power<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/0/P</b>
</dd>
  <dt class="optional">Tracker 1 voltage<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/0/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/1/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">Tracker 2 power<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/1/P</b>
</dd>
  <dt class="optional">Tracker 2 voltage<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/1/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/2/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">Tracker 3 power<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/2/P</b>
</dd>
  <dt class="optional">Tracker 3 voltage<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/2/V</b>
</dd>
  <dt class="optional">MPP operation mode tracker 4<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Pv/3/MppOperationMode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Voltage/current limited</li>
  <li>2 - MPPT active</li>
  <li>255 - Not available</li>
</ul>
</dd>
  <dt class="optional">Tracker 4 power<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/3/P</b>
</dd>
  <dt class="optional">Tracker 4 voltage<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/3/V</b>
</dd>
  <dt class="optional">PV voltage<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pv/V</b>
</dd>
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Charge state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>2 - Fault</li>
  <li>3 - Bulk</li>
  <li>4 - Absorption</li>
  <li>5 - Float</li>
  <li>6 - Storage</li>
  <li>7 - Equalize</li>
  <li>245 - Off</li>
  <li>247 - Equalize</li>
  <li>252 - External Control</li>
</ul>
</dd>
  <dt class="optional">PV Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Yield/Power</b>
</dd>
  <dt class="optional">Yield since last update (kWh)<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Yield/System</b>
</dd>
  <dt class="optional">Yield since reset (kWh)<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Yield/User</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-system">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>This input node takes is for retrieving information from the <tt>com.victronenergy.system</tt> dbus path.</p>
<h3>System</h3>
<dl class="message-properties">
  <dt class="optional">AC-Input<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/Source</b>
<ul>
  <li>0 - Not available</li>
  <li>1 - Grid</li>
  <li>2 - Generator</li>
  <li>3 - Shore</li>
  <li>240 - Inverting</li>
</ul>
</dd>
  <dt class="optional">AC Consumption L1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Consumption/L1/Power</b>
</dd>
  <dt class="optional">AC Consumption L2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Consumption/L2/Power</b>
</dd>
  <dt class="optional">AC Consumption L3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Consumption/L3/Power</b>
</dd>
  <dt class="optional">Genset Device Type<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Genset/DeviceType</b>
</dd>
  <dt class="optional">Genset L1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Genset/L1/Power</b>
</dd>
  <dt class="optional">Genset L2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Genset/L2/Power</b>
</dd>
  <dt class="optional">Genset L3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Genset/L3/Power</b>
</dd>
  <dt class="optional">Genset Number Of Phases<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Ac/Genset/NumberOfPhases</b>
</dd>
  <dt class="optional">Grid Device Type<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Grid/DeviceType</b>
</dd>
  <dt class="optional">Grid L1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Grid/L1/Power</b>
</dd>
  <dt class="optional">Grid L2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Grid/L2/Power</b>
</dd>
  <dt class="optional">Grid L3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Grid/L3/Power</b>
</dd>
  <dt class="optional">Grid Number Of Phases<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Ac/Grid/NumberOfPhases</b>
</dd>
  <dt class="optional">PV Power AC-tied on Generator L1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnGenset/L1/Power</b>
</dd>
  <dt class="optional">PV Power AC-tied on Generator L2<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnGenset/L2/Power</b>
</dd>
  <dt class="optional">PV Power AC-tied on Generator L3<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnGenset/L3/Power</b>
</dd>
  <dt class="optional">PV Power AC-tied on Generator Number Of Phases<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Ac/PvOnGenset/NumberOfPhases</b>
</dd>
  <dt class="optional">PV - AC-coupled on input L1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnGrid/L1/Power</b>
</dd>
  <dt class="optional">PV - AC-coupled on input L2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnGrid/L2/Power</b>
</dd>
  <dt class="optional">PV - AC-coupled on input L3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnGrid/L3/Power</b>
</dd>
  <dt class="optional">PV - AC-coupled on input Number Of Phases<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Ac/PvOnGrid/NumberOfPhases</b>
</dd>
  <dt class="optional">PV - AC-coupled on output L1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnOutput/L1/Power</b>
</dd>
  <dt class="optional">PV - AC-coupled on output L2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnOutput/L2/Power</b>
</dd>
  <dt class="optional">PV - AC-coupled on output L3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PvOnOutput/L3/Power</b>
</dd>
  <dt class="optional">PV - AC-coupled on output Number Of Phases<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Ac/PvOnOutput/NumberOfPhases</b>
</dd>
  <dt class="optional">Buzzer State<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Buzzer/State</b>
</dd>
  <dt class="optional">ESS active SOC limit (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Control/ActiveSocLimit</b>
</dd>
  <dt class="optional">Battery Consumed Amphours (Ah)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/ConsumedAmphours</b>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/Current</b>
</dd>
  <dt class="optional">Battery Power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/Power</b>
</dd>
  <dt class="optional">Battery State of Charge (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/Soc</b>
</dd>
  <dt class="optional">Battery state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Dc/Battery/State</b>
<ul>
  <li>0 - idle</li>
  <li>1 - charging</li>
  <li>2 - discharging</li>
</ul>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/Temperature</b>
</dd>
  <dt class="optional">Battery Time to Go (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/TimeToGo</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Battery/Voltage</b>
</dd>
  <dt class="optional">AC-Chargers - power (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Dc/Charger/Power</b>
</dd>
  <dt class="optional">MPPTs - current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Pv/Current</b>
</dd>
  <dt class="optional">MPPTs - power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Pv/Power</b>
</dd>
  <dt class="optional">DC System (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/System/Power</b>
</dd>
  <dt class="optional">VE.Bus charge current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Vebus/Current</b>
</dd>
  <dt class="optional">VE.Bus charge power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/Vebus/Power</b>
</dd>
  <dt class="optional">Serial (System)<span class="property-type">string</dt>
  <dd>Dbus path: <b>/Serial</b>
</dd>
  <dt class="optional">System type<span class="property-type">string</dt>
  <dd>Dbus path: <b>/SystemType</b>
</dd>
  <dt class="optional">Time off (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Timers/TimeOff</b>
</dd>
  <dt class="optional">Time generator (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Timers/TimeOnGenerator</b>
</dd>
  <dt class="optional">Time grid (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Timers/TimeOnGrid</b>
</dd>
  <dt class="optional">Time inverting (s)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Timers/TimeOnInverter</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-tank">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>The input-tank node is for retrieving tank level sensor information.</p><p>Also see the <a href="https://www.victronenergy.com/media/pg/Cerbo_GX/en/installation.html#UUID-e4027d37-78e0-4433-1be4-3252d3b79152">manual</a> for more information.</p>
<h3>Tank</h3>
<dl class="message-properties">
  <dt class="optional">Tank capacity (m3)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Capacity</b>
</dd>
  <dt class="optional">Fluid type<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/FluidType</b>
<ul>
  <li>0 - Fuel</li>
  <li>1 - Fresh water</li>
  <li>2 - Waste water</li>
  <li>3 - Live well</li>
  <li>4 - Oil</li>
  <li>5 - Black water (sewage)</li>
  <li>6 - Gasoline</li>
  <li>7 - Diesel</li>
  <li>8 - Liquid Petroleum Gas (LPG)</li>
  <li>9 - Liquid Natural Gas (LNG)</li>
  <li>10 - Hydraulic oil</li>
  <li>11 - Raw water</li>
</ul>
</dd>
  <dt class="optional">Tank level (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Level</b>
</dd>
  <dt class="optional">Product ID<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ProductId</b>
</dd>
  <dt class="optional">Fluid remaining (m3)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Remaining</b>
</dd>
  <dt class="optional">Tank sensor status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Status</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Disconnected</li>
  <li>2 - Short circuited</li>
  <li>3 - Unknown</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-temperature">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>Like the other nodes, the <b>input-temperature</b> node reads the temperate information from the dbus. This means that source of the temperature sensor can obtain its information from different sources (e.g. directly connected probe or Bluetooth connected Ruuvi tag).</p><p>See the <a href="https://www.victronenergy.com/media/pg/Cerbo_GX/en/installation.html#UUID-4d5df29c-761e-cfcc-9e2c-8230f126e7bb">manual</a> for information on connecting a temperature sensor.</p><p>Tank sensors also expose temperature, so they can appear under the dropdown too.</p>
<h3>Temperature</h3>
<dl class="message-properties">
  <dt class="optional">Acceleration X (g)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/AccelX</b>
</dd>
  <dt class="optional">Acceleration Y (g)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/AccelY</b>
</dd>
  <dt class="optional">Acceleration Z (g)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/AccelZ</b>
</dd>
  <dt class="optional">Sensor battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/BatteryVoltage</b>
</dd>
  <dt class="optional">Humidity (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Humidity</b>
</dd>
  <dt class="optional">Temperature offset<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Offset</b>
</dd>
  <dt class="optional">Pressure (kPa)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Pressure</b>
</dd>
  <dt class="optional">Product ID<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ProductId</b>
</dd>
  <dt class="optional">Temperature scale factor<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Scale</b>
</dd>
  <dt class="optional">Sensor status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Status</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Disconnected</li>
  <li>2 - Short circuited</li>
  <li>3 - Reverse polarity</li>
  <li>4 - Unknown</li>
</ul>
</dd>
  <dt class="optional">Temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Temperature</b>
</dd>
  <dt class="optional">Sensor type<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/TemperatureType</b>
<ul>
  <li>0 - Battery</li>
  <li>1 - Fridge</li>
  <li>2 - Generic</li>
</ul>
</dd>
</dl>
<h3>Tank</h3>
<dl class="message-properties">
  <dt class="optional">Sensor battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/BatteryVoltage</b>
</dd>
  <dt class="optional">Temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Temperature</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-input-vebus">
<h3>Details</h3>
<p>The <strong>input nodes</strong> have two selectable inputs: the devices select and measurement select. The available options are dynamically updated based on the data that is actually available on the Venus device.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>The measurement unit type is shown in the measurement label in brackets, e.g. Battery voltage (V). In case the data type is enumerated, an appropriate enum legend is shown below the selected option. In this case the node will also output the enumerated textual value as <tt>msg.textvalue</tt>.</p>
<p>If the data type is <em>float</em>, a dropdown for rounding the output appears.</p>
<p>By default the node outputs its value every five seconds. If the <em>only changes</em> is checked, the node will only output on value changes.</p>
<p>Information from VE.Bus connected devices can be obtained with this node.</p>
<h3>Vebus</h3>
<dl class="message-properties">
  <dt class="optional">Active input<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/ActiveInput</b>
<ul>
  <li>0 - AC Input 1</li>
  <li>1 - AC Input 2</li>
  <li>240 - Disconnected</li>
</ul>
</dd>
  <dt class="optional">Active input current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/CurrentLimit</b>
</dd>
  <dt class="optional">Input frequency phase 1 (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L1/F</b>
</dd>
  <dt class="optional">Input current phase 1 (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L1/I</b>
</dd>
  <dt class="optional">Input power phase 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L1/P</b>
</dd>
  <dt class="optional">Input voltage phase 1 (VAC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L1/V</b>
</dd>
  <dt class="optional">Input frequency phase 2 (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L2/F</b>
</dd>
  <dt class="optional">Input current phase 2 (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L2/I</b>
</dd>
  <dt class="optional">Input power phase 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L2/P</b>
</dd>
  <dt class="optional">Input voltage phase 2 (VAC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L2/V</b>
</dd>
  <dt class="optional">Input frequency phase 3 (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L3/F</b>
</dd>
  <dt class="optional">Input current phase 3 (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L3/I</b>
</dd>
  <dt class="optional">Input power phase 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L3/P</b>
</dd>
  <dt class="optional">Input voltage phase 3 (VAC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/L3/V</b>
</dd>
  <dt class="optional">Select Remote Generator<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/Control/RemoteGeneratorSelected</b>
<ul>
  <li>0 - Generator not selected</li>
  <li>1 - Generator selected</li>
</ul>
</dd>
  <dt class="optional">Input 1 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/CurrentLimit</b>
</dd>
  <dt class="optional">Input 1 current limit is adjustable<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/In/1/CurrentLimitIsAdjustable</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Input 2 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/2/CurrentLimit</b>
</dd>
  <dt class="optional">Input 2 current limit is adjustable<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/In/2/CurrentLimitIsAdjustable</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Phase count<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/NumberOfPhases</b>
</dd>
  <dt class="optional">Output frequency phase 1 (Hz)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/F</b>
</dd>
  <dt class="optional">Output current phase 1 (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/I</b>
</dd>
  <dt class="optional">Output power phase 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/P</b>
</dd>
  <dt class="optional">Output voltage phase 1 (VAC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L1/V</b>
</dd>
  <dt class="optional">Output current phase 2 (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L2/I</b>
</dd>
  <dt class="optional">Output power phase 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L2/P</b>
</dd>
  <dt class="optional">Output voltage phase 2 (VAC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L2/V</b>
</dd>
  <dt class="optional">Output current phase 3 (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L3/I</b>
</dd>
  <dt class="optional">Output power phase 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L3/P</b>
</dd>
  <dt class="optional">Output voltage phase 3 (VAC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/Out/L3/V</b>
</dd>
  <dt class="optional">AC input 1 ignored<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/State/IgnoreAcIn1</b>
<ul>
  <li>0 - AC input not ignored</li>
  <li>1 - AC input ignored</li>
</ul>
</dd>
  <dt class="optional">AC input 2 ignored<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/State/IgnoreAcIn2</b>
<ul>
  <li>0 - AC input not ignored</li>
  <li>1 - AC input ignored</li>
</ul>
</dd>
  <dt class="optional">Remote generator selected<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/State/RemoteGeneratorSelected</b>
<ul>
  <li>0 - Generator not selected</li>
  <li>1 - Generator selected</li>
</ul>
</dd>
  <dt class="optional">Low cell voltage imminent<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/BmsPreAlarm</b>
<ul>
  <li>0 - OK</li>
  <li>1 - Warning</li>
</ul>
</dd>
  <dt class="optional">Grid lost alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/GridLost</b>
<ul>
  <li>0 - Ok</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Temperature<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Temperature alarm L1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L1/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery alarm L1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L1/LowBattery</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Overload alarm L1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L1/Overload</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Ripple alarm L1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L1/Ripple</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Temperature alarm L2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L2/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery alarm L2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L2/LowBattery</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Overload alarm L2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L2/Overload</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Ripple alarm L2<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L2/Ripple</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Temperature alarm L3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L3/HighTemperature</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery alarm L3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L3/LowBattery</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Overload alarm L3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L3/Overload</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Ripple alarm L3<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/L3/Ripple</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Low battery<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/LowBattery</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Overload<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/Overload</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Phase Rotation<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/PhaseRotation</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
</ul>
</dd>
  <dt class="optional">Temperature sensor alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/TemperatureSensor</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">Voltage sensor alarm<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Alarms/VoltageSensor</b>
<ul>
  <li>0 - Ok</li>
  <li>1 - Warning</li>
  <li>2 - Alarm</li>
</ul>
</dd>
  <dt class="optional">BMS allows battery to be charged<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Bms/AllowToCharge</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">BMS allows battery to be discharged<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Bms/AllowToDischarge</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">VE.Bus BMS is expected<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Bms/BmsExpected</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">VE.Bus BMS error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Bms/Error</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Low cell voltage imminent<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Bms/PreAlarm</b>
<ul>
  <li>0 - OK</li>
  <li>1 - Pre-Alarm</li>
</ul>
</dd>
  <dt class="optional">Battery current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Current</b>
</dd>
  <dt class="optional">Prefer Renewable Energy<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Dc/0/PreferRenewableEnergy</b>
<ul>
  <li>0 - Renewable energy not preferred</li>
  <li>1 - Renewable energy preferred</li>
</ul>
</dd>
  <dt class="optional">Battery temperature (°C)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Temperature</b>
</dd>
  <dt class="optional">Battery voltage (V)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Dc/0/Voltage</b>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/0/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/0/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/0/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/1/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/1/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/1/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/2/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/2/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/2/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/3/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/3/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/3/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/4/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/4/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/4/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/5/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/5/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/5/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/6/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/6/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/6/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/7/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/7/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/7/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/8/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/8/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/8/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/9/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/9/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/9/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/10/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/10/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/10/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/11/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/11/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/11/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Energy ACIn1 to AcOut (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn1ToAcOut</b>
</dd>
  <dt class="optional">Energy AcIn1 to Inverter (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn1ToInverter</b>
</dd>
  <dt class="optional">Energy ACIn2 to AcOut (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn2ToAcOut</b>
</dd>
  <dt class="optional">Energy ACIn2 to Inverter (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcIn2ToInverter</b>
</dd>
  <dt class="optional">Energy AcOut to AcIn1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcOutToAcIn1</b>
</dd>
  <dt class="optional">Energy AcOut to AcIn2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/AcOutToAcIn2</b>
</dd>
  <dt class="optional">Energy Inverter to AcIn1 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcIn1</b>
</dd>
  <dt class="optional">Energy Inverter to AcIn2 (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcIn2</b>
</dd>
  <dt class="optional">Inverter To AcOut (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/InverterToAcOut</b>
</dd>
  <dt class="optional">AcOut to Inverter (kWh)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Energy/OutToInverter</b>
</dd>
  <dt class="optional">ESS disable charge flag phase<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableCharge</b>
<ul>
  <li>0 - Charge allowed</li>
  <li>1 - Charge disabled</li>
</ul>
</dd>
  <dt class="optional">Solar offset voltage<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/FixSolarOffsetTo100mV</b>
<ul>
  <li>0 - OvervoltageFeedIn uses 1V offset</li>
  <li>1 - OvervoltageFeedIn uses 0.1V offset</li>
</ul>
</dd>
  <dt class="optional">Sustain active<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/Sustain</b>
<ul>
  <li>0 - Sustain inactive</li>
  <li>1 - Sustain active</li>
</ul>
</dd>
  <dt class="optional">AcPowerSetpoint acts as feed-in limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/TargetPowerIsMaxFeedIn</b>
<ul>
  <li>0 - AcPowerSetpoint interpreted normally</li>
  <li>1 - AcPowerSetpoint is OvervoltageFeedIn limit</li>
</ul>
</dd>
  <dt class="optional">Switch Position<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - Charger Only</li>
  <li>2 - Inverter Only</li>
  <li>3 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
  <dt class="optional">Mode is adjustable<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ModeIsAdjustable</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">VE.Bus state of charge (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Soc</b>
</dd>
  <dt class="optional">VE.Bus state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/State</b>
<ul>
  <li>0 - Off</li>
  <li>1 - Low Power</li>
  <li>2 - Fault</li>
  <li>3 - Bulk</li>
  <li>4 - Absorption</li>
  <li>5 - Float</li>
  <li>6 - Storage</li>
  <li>7 - Equalize</li>
  <li>8 - Passthru</li>
  <li>9 - Inverting</li>
  <li>10 - Power assist</li>
  <li>11 - Power supply</li>
  <li>252 - External control</li>
</ul>
</dd>
  <dt class="optional">Charge state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/VebusChargeState</b>
<ul>
  <li>0 - Initialising</li>
  <li>1 - Bulk</li>
  <li>2 - Absorption</li>
  <li>3 - Float</li>
  <li>4 - Storage</li>
  <li>5 - Absorb repeat</li>
  <li>6 - Forced absorb</li>
  <li>7 - Equalise</li>
  <li>8 - Bulk stopped</li>
  <li>9 - Unknown</li>
</ul>
</dd>
  <dt class="optional">VE.Bus Error<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/VebusError</b>
<ul>
  <li>0 - No error</li>
  <li>1 - VE.Bus Error 1: Device is switched off because one of the other phases in the system has switched off</li>
  <li>2 - VE.Bus Error 2: New and old types MK2 are mixed in the system</li>
  <li>3 - VE.Bus Error 3: Not all, or more than, the expected devices were found in the system</li>
  <li>4 - VE.Bus Error 4: No other device whatsoever detected</li>
  <li>5 - VE.Bus Error 5: Overvoltage on AC-out</li>
  <li>6 - VE.Bus Error 6: Error in DDC Program</li>
  <li>7 - VE.Bus Error 7:  BMS connected, which requires an Assistant, but no assistant found</li>
  <li>8 - VE.Bus Error 8: Ground relay test failed</li>
  <li>9 - VE.Bus Error 9</li>
  <li>10 - VE.Bus Error 10: System time synchronisation problem occurred</li>
  <li>11 - VE.Bus Error 11: Relay test fault</li>
  <li>12 - VE.Bus Error 12</li>
  <li>13 - VE.Bus Error 13</li>
  <li>14 - VE.Bus Error 14: Device cannot transmit data</li>
  <li>15 - VE.Bus Error 15</li>
  <li>16 - VE.Bus Error 16: Awaiting configuration or dongle missing</li>
  <li>17 - VE.Bus Error 17: Phase master missing</li>
  <li>18 - VE.Bus Error 18: AC Overvoltage on the output of a slave has occurred while already switched off</li>
  <li>19 - VE.Bus Error 19</li>
  <li>20 - VE.Bus Error 20</li>
  <li>21 - VE.Bus Error 21</li>
  <li>22 - VE.Bus Error 22: This device cannot function as slave</li>
  <li>23 - VE.Bus Error 23</li>
  <li>24 - VE.Bus Error 24: Switch-over system protection initiated</li>
  <li>25 - VE.Bus Error 25: Firmware incompatibility. The firmware of one of the connected device is not sufficiently up to date to operate in conjunction with this device</li>
  <li>26 - VE.Bus Error 26: Internal error</li>
  <li>27 - VE.Bus Error 27</li>
  <li>28 - VE.Bus Error 28</li>
  <li>29 - VE.Bus Error 29</li>
  <li>30 - VE.Bus Error 30</li>
  <li>31 - VE.Bus Error 31</li>
  <li>32 - VE.Bus Error 32</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-accharger">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node is for controlling the AC charger.</p>
<h3>Charger</h3>
<dl class="message-properties">
  <dt class="optional">AC Current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/CurrentLimit</b>
</dd>
  <dt class="optional">Charger on/off<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-battery">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>Battery monitor output node, which can be used for controlling a <a href="https://www.victronenergy.com/dc-distribution-systems/lynx-smart-bms">Lynx Smart BMS</a>.</p>
<h3>Battery</h3>
<dl class="message-properties">
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>3 - On</li>
  <li>252 - Standby</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-charger">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node allows for controlling a connected charger.</p>
<h3>Charger</h3>
<dl class="message-properties">
  <dt class="optional">AC Current limit (A AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/CurrentLimit</b>
</dd>
  <dt class="optional">Charger on/off<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>0 - Off</li>
  <li>1 - On</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-dcdc">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node allows for controlling an Orion XS.</p>
<h3>Dcdc</h3>
<dl class="message-properties">
  <dt class="optional">/Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-ess">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node allows for controlling the Energy Storage System (ESS).</p>
<h3>Vebus</h3>
<dl class="message-properties">
  <dt class="optional">Disable charge<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableCharge</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Disable feed-in<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableFeedIn</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">Feed in overvoltage<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DoNotFeedInOvervoltage</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">AC Power L1 setpoint (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L1/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L1 (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L1/MaxFeedInPower</b>
</dd>
  <dt class="optional">AC Power L2 setpoint (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L2/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L2 (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L2/MaxFeedInPower</b>
</dd>
  <dt class="optional">AC Power L3 setpoint (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L3/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L3 (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Hub4/L3/MaxFeedInPower</b>
</dd>
</dl>
<h3>Settings</h3>
<dl class="message-properties">
  <dt class="optional">Grid set-point (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/AcPowerSetPoint</b>
</dd>
  <dt class="optional">Minimum Discharge SOC (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/MinimumSocLimit</b>
</dd>
  <dt class="optional">Schedule 1: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 1: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>Writing a negative value to the path will de-activate the schedule.</p>
</dd>
  <dt class="optional">Schedule 1: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Duration</b>
</dd>
  <dt class="optional">Schedule 1: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Soc</b>
</dd>
  <dt class="optional">Schedule 1: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/0/Start</b>
</dd>
  <dt class="optional">Schedule 2: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 2: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>Writing a negative value to the path will de-activate the schedule.</p>
</dd>
  <dt class="optional">Schedule 2: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Duration</b>
</dd>
  <dt class="optional">Schedule 2: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Soc</b>
</dd>
  <dt class="optional">Schedule 2: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/1/Start</b>
</dd>
  <dt class="optional">Schedule 3: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 3: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>Writing a negative value to the path will de-activate the schedule.</p>
</dd>
  <dt class="optional">Schedule 3: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Duration</b>
</dd>
  <dt class="optional">Schedule 3: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Soc</b>
</dd>
  <dt class="optional">Schedule 3: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/2/Start</b>
</dd>
  <dt class="optional">Schedule 4: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 4: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>Writing a negative value to the path will de-activate the schedule.</p>
</dd>
  <dt class="optional">Schedule 4: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Duration</b>
</dd>
  <dt class="optional">Schedule 4: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Soc</b>
</dd>
  <dt class="optional">Schedule 4: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/3/Start</b>
</dd>
  <dt class="optional">Schedule 5: Self-consumption above limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/AllowDischarge</b>
<ul>
  <li>0 - Yes</li>
  <li>1 - No</li>
</ul>
</dd>
  <dt class="optional">Schedule 5: Day<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Day</b>
<ul>
  <li>0 - Sunday</li>
  <li>1 - Monday</li>
  <li>2 - Tuesday</li>
  <li>3 - Wednesday</li>
  <li>4 - Thursday</li>
  <li>5 - Friday</li>
  <li>6 - Saturday</li>
  <li>7 - Every day</li>
  <li>8 - Weekdays</li>
  <li>9 - Weekends</li>
</ul>
<p>Writing a negative value to the path will de-activate the schedule.</p>
</dd>
  <dt class="optional">Schedule 5: Duration (seconds)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Duration</b>
</dd>
  <dt class="optional">Schedule 5: State of charge (%)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Soc</b>
</dd>
  <dt class="optional">Schedule 5: Start (seconds after midnight)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/Schedule/Charge/4/Start</b>
</dd>
  <dt class="optional">ESS state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/State</b>
<ul>
  <li>1 - BatteryLife enabled (GUI controlled)</li>
  <li>2 - Optimized Mode /w BatteryLife: self consumption</li>
  <li>3 - Optimized Mode /w BatteryLife: self consumption, SoC exceeds 85%</li>
  <li>4 - Optimized Mode /w BatteryLife: self consumption, SoC at 100%</li>
  <li>5 - Optimized Mode /w BatteryLife: SoC below dynamic SoC limit</li>
  <li>6 - Optimized Mode /w BatteryLife: SoC has been below SoC limit for more than 24 hours. Charging the battery (5A)</li>
  <li>7 - Optimized Mode /w BatteryLife: Inverter/Charger is in sustain mode</li>
  <li>8 - Optimized Mode /w BatteryLife: recharging, SoC dropped by 5% or more below the minimum SoC</li>
  <li>9 - 'Keep batteries charged' mode is enabled</li>
  <li>10 - Optimized mode w/o BatteryLife: self consumption, SoC at or above minimum SoC</li>
  <li>11 - Optimized mode w/o BatteryLife: self consumption, SoC is below minimum SoC</li>
  <li>12 - Optimized mode w/o BatteryLife: recharging, SoC dropped by 5% or more below minimum SoC</li>
</ul>
</dd>
  <dt class="optional">ESS mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/Hub4Mode</b>
<ul>
  <li>1 - Optimized mode or 'keep batteries charged' and phase compensation enabled</li>
  <li>2 - Optimized mode or 'keep batteries charged' and phase compensation disabled</li>
  <li>3 - External control</li>
</ul>
</dd>
  <dt class="optional">Max charge power (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxChargePower</b>
<p>Not used with DVCC.</p>
</dd>
  <dt class="optional">Max inverter power (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxDischargePower</b>
</dd>
  <dt class="optional">Maximum System Grid Feed In (W)<span class="property-type">integer</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxFeedInPower</b>
<ul><li>-1: No limit</li><li> &gt;=0: limited system feed-in</li></ul><p>Applies to DC-coupled and AC-coupled feed-in.</p>
</dd>
  <dt class="optional">Feed excess DC-coupled PV into grid<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/OvervoltageFeedIn</b>
<ul>
  <li>0 - Don’t feed excess DC-tied PV into grid</li>
  <li>1 - Feed excess DC-tied PV into the grid</li>
</ul>
</dd>
  <dt class="optional">Don’t feed excess AC-coupled PV into grid<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/PreventFeedback</b>
<ul>
  <li>0 - Feed excess AC-tied PV into grid</li>
  <li>1 - Don’t feed excess AC-tied PV into the grid</li>
</ul>
</dd>
  <dt class="optional">Charge current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/MaxChargeCurrent</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-evcharger">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>With this node the EV charging station can be controlled.</p><p>Note that you need to refresh the website of the EV charger in order to see the changed settings there.</p>
<h3>Evcharger</h3>
<dl class="message-properties">
  <dt class="optional">Display<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/EnableDisplay</b>
<ul>
  <li>0 - Locked</li>
  <li>1 - Unlocked</li>
</ul>
</dd>
  <dt class="optional">Maximum charge current (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/MaxCurrent</b>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>0 - Manual</li>
  <li>1 - Auto</li>
  <li>2 - Schedule</li>
</ul>
</dd>
  <dt class="optional">Position<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Position</b>
<ul>
  <li>0 - AC input 1</li>
  <li>1 - AC output</li>
  <li>2 - AC input 2</li>
</ul>
</dd>
  <dt class="optional">Set charge current (manual mode) (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/SetCurrent</b>
</dd>
  <dt class="optional">Start/stop charging (manual mode)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/StartStop</b>
<ul>
  <li>0 - Stop</li>
  <li>1 - Start</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-generator">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node can be used for controlling a generator via the relay. In order to use the relay for controlling a generator, make sure to set the relay to <i>Generator</i> via the (remote) console first.</p>
<h3>Generator</h3>
<dl class="message-properties">
  <dt class="optional">Auto start enabled/disabled<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/AutoStartEnabled</b>
<ul>
  <li>0 - Autostart disabled</li>
  <li>1 - Autostart enabled</li>
</ul>
</dd>
  <dt class="optional">Manual Start<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/ManualStart</b>
<ul>
  <li>0 - Stop generator</li>
  <li>1 - Start generator</li>
</ul>
</dd>
  <dt class="optional">Service countdown reset (1=Reset service counter)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/ServiceCounterReset</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-inverter">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node can be used for controlling the inverter.</p>
<h3>Inverter</h3>
<dl class="message-properties">
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>2 - Inverter on</li>
  <li>4 - Off</li>
  <li>5 - Low Power/ECO</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-multi">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>Multi RS output node.</p>
<h3>Multi</h3>
<dl class="message-properties">
  <dt class="optional">Ac input 1 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/CurrentLimit</b>
</dd>
  <dt class="optional">Ac input 2 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/2/CurrentLimit</b>
</dd>
  <dt class="optional">Switch position<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - Charger Only</li>
  <li>2 - Inverter Only</li>
  <li>3 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-pump">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>Node for controlling a relay connected pump. In auto mode, the pump looks at the connected tank sensor levels for starting and stopping the pump.</p>
<h3>Settings</h3>
<dl class="message-properties">
  <dt class="optional">Auto start enabled<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/Pump0/AutoStartEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/Pump0/Mode</b>
<ul>
  <li>0 - Auto</li>
  <li>1 - On</li>
  <li>2 - Off</li>
</ul>
</dd>
  <dt class="optional">Start value (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/Pump0/StartValue</b>
</dd>
  <dt class="optional">Stop value (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/Pump0/StopValue</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-pvinverter">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This node is for setting information into the PV inverter.</p>
<h3>Pvinverter</h3>
<dl class="message-properties">
  <dt class="optional">Power limit (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/PowerLimit</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-relay">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>The relays of the Venus device can be controlled with this node. Make sure to set the relay(s) to <b>Manual</b> via the Venus OS GUI first.</p>
<h3>System</h3>
<dl class="message-properties">
  <dt class="optional">Venus relay 1 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Venus relay 2 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/1/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Venus relay 3 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/2/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
  <dt class="optional">Venus relay 4 state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/3/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Battery</h3>
<dl class="message-properties">
  <dt class="optional">Relay status<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Charger</h3>
<dl class="message-properties">
  <dt class="optional">Relay on the charger<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Inverter</h3>
<dl class="message-properties">
  <dt class="optional">Relay state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
<h3>Multi</h3>
<dl class="message-properties">
  <dt class="optional">Relay on the Multi RS<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Relay/0/State</b>
<ul>
  <li>0 - Open</li>
  <li>1 - Closed</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-settings">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>With this node several settings can be adjusted. Currently the focus is mainly on the Carlo Gavazzi Wired AC Sensors (cgwacs).</p>
<h3>Settings</h3>
<dl class="message-properties">
  <dt class="optional">ESS control loop setpoint (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/AcPowerSetPoint</b>
</dd>
  <dt class="optional">ESS Minimum SoC (unless grid fails) (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/MinimumSocLimit</b>
</dd>
  <dt class="optional">ESS BatteryLife state<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/BatteryLife/State</b>
<ul>
  <li>0 - Unused, BL disabled</li>
  <li>1 - Restarting</li>
  <li>2 - Self-consumption</li>
  <li>3 - Self-consumption</li>
  <li>4 - Self-consumption</li>
  <li>5 - Discharge disabled</li>
  <li>6 - Force charge</li>
  <li>7 - Sustain</li>
  <li>8 - Low Soc Recharge</li>
  <li>9 - Keep batteries charged</li>
  <li>10 - BL Disabled</li>
  <li>11 - BL Disabled (Low SoC)</li>
  <li>12 - BL Disabled (Low SOC recharge)</li>
</ul>
</dd>
  <dt class="optional">Auto start enabled<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/Pump0/AutoStartEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/Pump0/Mode</b>
<ul>
  <li>0 - Auto</li>
  <li>1 - On</li>
  <li>2 - Off</li>
</ul>
</dd>
  <dt class="optional">Start value (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/Pump0/StartValue</b>
</dd>
  <dt class="optional">Stop value (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/Pump0/StopValue</b>
</dd>
  <dt class="optional">DVCC system max charge current (A DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/MaxChargeCurrent</b>
</dd>
  <dt class="optional">ESS Mode<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/Hub4Mode</b>
<ul>
  <li>1 - ESS with Phase Compensation</li>
  <li>2 - ESS without phase compensation</li>
  <li>3 - Disabled/External Control</li>
</ul>
</dd>
  <dt class="optional">ESS max charge current (fractional) (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxChargePercentage</b>
</dd>
  <dt class="optional">ESS max discharge current (fractional) (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxDischargePercentage</b>
</dd>
  <dt class="optional">ESS max charge power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxChargePower</b>
</dd>
  <dt class="optional">ESS max discharge power (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxDischargePower</b>
</dd>
  <dt class="optional">Maximum System Grid Feed In (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/MaxFeedInPower</b>
</dd>
  <dt class="optional">Feed excess DC-coupled PV into grid<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/OvervoltageFeedIn</b>
<ul>
  <li>0 - Don’t feed excess DC-tied PV into grid</li>
  <li>1 - Feed excess DC-tied PV into the grid</li>
</ul>
</dd>
  <dt class="optional">AC-coupled PV - grid feed in excess<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/CGwacs/PreventFeedback</b>
<ul>
  <li>0 - Feed excess AC-tied PV into grid</li>
  <li>1 - Don’t feed excess AC-tied PV into the grid</li>
</ul>
</dd>
  <dt class="optional">Enable status LEDs<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/LEDs/Enable</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">AC input 1 source (for VE.Bus inverter/chargers)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/AcInput1</b>
<ul>
  <li>0 - Unused</li>
  <li>1 - Grid</li>
  <li>2 - Genset</li>
  <li>3 - Shore</li>
</ul>
</dd>
  <dt class="optional">AC input 2 source (for VE.Bus inverter/chargers)<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/AcInput2</b>
<ul>
  <li>0 - Unused</li>
  <li>1 - Grid</li>
  <li>2 - Genset</li>
  <li>3 - Shore</li>
</ul>
</dd>
  <dt class="optional">Limit managed battery voltage (V DC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Settings/SystemSetup/MaxChargeVoltage</b>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-solarcharger">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>With this node the solar charger can be switched on and off.</p>
<h3>Solarcharger</h3>
<dl class="message-properties">
  <dt class="optional">Charger on/off<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - On</li>
  <li>4 - Off</li>
</ul>
</dd>
</dl>
</script>

<script type="text/x-red" data-help-name="victron-output-vebus">
<h3>Details</h3>
<p><strong>Output nodes</strong> have the same options available as input nodes, but the selectable measurement only lists writable services. Additionally, the user can set an initial value to the service, which is sent whenever the flow is deployed.</p> <ul> <li><em>Device select</em> - lists all available devices</li> <li><em>Measurement select</em> - lists all available device-specific measurements</li> <li><em>Initial value input field</em> - lists all available device-specific measurements</li> <li><em>Node label input field</em> - sets a custom label for the node</li> </ul> <p>All output nodes should have the control value set in its incoming messages <code>msg.payload</code> property.</p> 
<p>This output node is for writing to VE.Bus connected devices.</p>
<h3>Vebus</h3>
<dl class="message-properties">
  <dt class="optional">Active input current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/ActiveIn/CurrentLimit</b>
</dd>
  <dt class="optional">Select Remote Generator<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Ac/Control/RemoteGeneratorSelected</b>
<ul>
  <li>0 - Generator not selected</li>
  <li>1 - Generator selected</li>
</ul>
</dd>
  <dt class="optional">Input 1 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/1/CurrentLimit</b>
</dd>
  <dt class="optional">Input 2 current limit (A)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Ac/In/2/CurrentLimit</b>
</dd>
  <dt class="optional">Prefer Renewable Energy<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Dc/0/PreferRenewableEnergy</b>
<ul>
  <li>0 - Renewable energy not preferred</li>
  <li>1 - Renewable energy preferred</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/0/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/0/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/0/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/1/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/1/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/1/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/2/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/2/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/2/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/3/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/3/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/3/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/4/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/4/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/4/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/5/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/5/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/5/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/6/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/6/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/6/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/7/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/7/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/7/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/8/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/8/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/8/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/9/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/9/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/9/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/10/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/10/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/10/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">Configured boost factor for VE.Bus unit 1<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/11/Settings/AssistCurrentBoostFactor</b>
</dd>
  <dt class="optional">Configured output voltage for VE.Bus unit 1 (V AC)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Devices/11/Settings/InverterOutputVoltage</b>
</dd>
  <dt class="optional">PowerAssist enabled unit 1<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Devices/11/Settings/PowerAssistEnabled</b>
<ul>
  <li>0 - Disabled</li>
  <li>1 - Enabled</li>
</ul>
</dd>
  <dt class="optional">ESS disable charge flag phase<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableCharge</b>
<ul>
  <li>0 - Charge allowed</li>
  <li>1 - Charge disabled</li>
</ul>
</dd>
  <dt class="optional">ESS disable feedback flag phase<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DisableFeedIn</b>
<ul>
  <li>0 - Feed in allowed</li>
  <li>1 - Feed in disabled</li>
</ul>
</dd>
  <dt class="optional">Feed DC overvoltage into grid<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/DoNotFeedInOvervoltage</b>
<ul>
  <li>0 - Feed in overvoltage</li>
  <li>1 - Do not feed in overvoltage</li>
</ul>
</dd>
  <dt class="optional">Solar offset voltage<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/FixSolarOffsetTo100mV</b>
<ul>
  <li>0 - OvervoltageFeedIn uses 1V offset</li>
  <li>1 - OvervoltageFeedIn uses 0.1V offset</li>
</ul>
</dd>
  <dt class="optional">ESS power setpoint phase 1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Hub4/L1/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L1 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Hub4/L1/MaxFeedInPower</b>
</dd>
  <dt class="optional">ESS power setpoint phase 2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Hub4/L2/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L2 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Hub4/L2/MaxFeedInPower</b>
</dd>
  <dt class="optional">ESS power setpoint phase 3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Hub4/L3/AcPowerSetpoint</b>
</dd>
  <dt class="optional">Maximum overvoltage feed-in power L3 (W)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Hub4/L3/MaxFeedInPower</b>
</dd>
  <dt class="optional">AcPowerSetpoint acts as feed-in limit<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Hub4/TargetPowerIsMaxFeedIn</b>
<ul>
  <li>0 - AcPowerSetpoint interpreted normally</li>
  <li>1 - AcPowerSetpoint is OvervoltageFeedIn limit</li>
</ul>
</dd>
  <dt class="optional">Switch Position<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/Mode</b>
<ul>
  <li>1 - Charger Only</li>
  <li>2 - Inverter Only</li>
  <li>3 - On</li>
  <li>4 - Off</li>
</ul>
<p>Note that <tt>/ModeIsAdjustable</tt> needs to be set to 1.</p> 
</dd>
  <dt class="optional">Disable PV inverter<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/PvInverter/Disable</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
  <dt class="optional">VE.Bus state of charge (%)<span class="property-type">float</dt>
  <dd>Dbus path: <b>/Soc</b>
</dd>
  <dt class="optional">VE.Bus Reset<span class="property-type">enum</dt>
  <dd>Dbus path: <b>/SystemReset</b>
<ul>
  <li>0 - No</li>
  <li>1 - Yes</li>
</ul>
</dd>
</dl>
</script>

