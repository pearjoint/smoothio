using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.ServiceProcess;
using System.Text;

namespace MetaLeapService {
	public partial class MetaLeapService : ServiceBase {
		public MetaLeapService () {
			InitializeComponent ();
		}

		protected override void OnStart (string [] args) {
		}

		protected override void OnStop () {
		}
	}
}
